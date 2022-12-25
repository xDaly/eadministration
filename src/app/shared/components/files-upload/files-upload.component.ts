import { Component, OnInit, ViewChild, Input, OnChanges, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Document } from '@shared/models/document';
import { DropzoneConfigInterface, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { FileUploadService } from '@core/services/fileUpload/file-upload.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'file-uploader',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.scss']
})
export class FilesUploadComponent implements OnInit, AfterViewInit, OnChanges {

  @Input() acceptedFiles: string;
  @Input() FileInfo: Document;
  config: DropzoneConfigInterface = {
    url: environment.uploadUrl,
    dictInvalidFileType: 'you can\'t upload this type of file ',
    maxFiles: 1,
    acceptedFiles: '*/*',
    dictMaxFilesExceeded: 'You can not upload any more files.',
    autoProcessQueue: true,
    autoQueue: true,
  };
  alreadyLoaded = false;


  @ViewChild(DropzoneDirective) directiveRef: DropzoneDirective;
  @Output() fileName = new EventEmitter();

  constructor(private UploadService: FileUploadService) { }
  ngOnChanges() {
    if (this.directiveRef.dropzone() !== undefined) {
    if (this.FileInfo.fileUrl !== undefined && this.directiveRef.dropzone() !== undefined && !this.alreadyLoaded) {
      const BaseUrl = environment.storageUrl;
      const mockFile = {name: this.FileInfo.fileName, size: this.FileInfo.fileSize, dataURL: BaseUrl + this.FileInfo.fileUrl };
      const ext = this.CheckFileEXT(this.FileInfo.fileName);
      if (ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg') {
      mockFile.dataURL = BaseUrl + 'DefaultPDF.png';
      }
      this.directiveRef.dropzone().files.push(mockFile);
      this.directiveRef.dropzone().emit('addedfile', mockFile);
      this.directiveRef.dropzone().createThumbnailFromUrl(
        mockFile,
        this.directiveRef.dropzone().options.thumbnailWidth,
        this.directiveRef.dropzone().options.thumbnailHeight,
        this.directiveRef.dropzone().options.thumbnailMethod,
        true,
        thumbnail => {
          this.directiveRef.dropzone().emit('thumbnail', mockFile, thumbnail);
        }, 'anonymous'
      );
      this.directiveRef.dropzone().emit('complete', mockFile);
      this.directiveRef.dropzone().disable();
      this.alreadyLoaded = true;
      }
    }
  }
  ngAfterViewInit() {
    if (this.directiveRef.dropzone() !== undefined) {
    if (this.FileInfo.fileUrl !== undefined && this.directiveRef.dropzone() !== undefined && !this.alreadyLoaded) {
      const BaseUrl = environment.storageUrl;
      const mockFile = {name: this.FileInfo.fileName, size: this.FileInfo.fileSize, dataURL: BaseUrl + this.FileInfo.fileUrl };
      const ext = this.CheckFileEXT(this.FileInfo.fileName);
      if (ext !== 'png' && ext !== 'jpg' && ext !== 'jpeg') {
      mockFile.dataURL = BaseUrl + 'DefaultPDF.png';
      }
      this.directiveRef.dropzone().files.push(mockFile);
      this.directiveRef.dropzone().emit('addedfile', mockFile);
      this.directiveRef.dropzone().createThumbnailFromUrl(
        mockFile,
        this.directiveRef.dropzone().options.thumbnailWidth,
        this.directiveRef.dropzone().options.thumbnailHeight,
        this.directiveRef.dropzone().options.thumbnailMethod,
        true,
        thumbnail => {
          this.directiveRef.dropzone().emit('thumbnail', mockFile, thumbnail);
        }, 'anonymous'
      );
      this.directiveRef.dropzone().emit('complete', mockFile);
      this.directiveRef.dropzone().disable();
      this.alreadyLoaded = true;
      }
    }
  }

  ngOnInit() {
    this.config.acceptedFiles = this.acceptedFiles;
    this.config.renameFile = (file: File) => {
      this.FileInfo.fileName = file.name;
      this.FileInfo.fileSize = file.size;
      return file.name;
    };
  }
  CheckFileEXT(filename: string) {
    filename = filename.toLowerCase();
    return filename.split('.').pop();
  }


  onUploadSuccess(value) {
    this.FileInfo.fileUrl = value[1];
    // this.fileNameUrl = value[1];
      this.fileName.emit(this.FileInfo);
      this.directiveRef.dropzone().disable();
  }
  onUploadError(value) {
  }

  Clear() {
    this.directiveRef.dropzone().removeAllFiles(true);
    this.UploadService.DeleteUploadDocument(this.FileInfo.fileUrl).subscribe(() => {this.fileName.emit(); }, () => {} );
    this.directiveRef.dropzone().enable();
  }
}
