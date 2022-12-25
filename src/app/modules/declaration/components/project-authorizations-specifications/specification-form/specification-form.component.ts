import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { DropzoneConfigInterface, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { Specification } from '@shared/models/Specification';
import { FileUploadService } from '@core/services/fileUpload/file-upload.service';
import { EntityType } from '@shared/models/Enums/EntityType';
import { DocumentType } from '@shared/models/Enums/DocumentType';
import { NgbDateAdapter, NgbDateNativeUTCAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ConverterService } from '@shared/converters/converterService';
import { Document } from '@shared/models/document';

@Component({
  selector: 'tia-specification-form',
  templateUrl: './specification-form.component.html',
  styleUrls: ['./specification-form.component.scss'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeUTCAdapter}]
})
export class SpecificationFormComponent implements OnInit, OnChanges {

  @Input() uploadConfig: any;
  @Output() uploadSpecification = new EventEmitter();
  specification = new Specification();
  specificationInvoice = new Document();
  showData?: boolean;
  acceptedFiles = 'application/pdf';
  declarationId: number;
  constructor(private uploadService: FileUploadService,
              private converterService: ConverterService) { }

  ngOnInit() {
  }
  ngOnChanges() {
      if (this.uploadConfig.value) {
      this.specification = Object.assign({}, this.uploadConfig.value);
      this.specification.issueDate = this.specification.issueDate ? this.converterService.ConvertDate(this.specification.issueDate) : null;
      this.showData = this.uploadConfig.showData;
      this.specificationInvoice = this.specification.specificationInvoice;
    }
  }
  GetSpecificationUrl(fileInfo: Document) {
    if (fileInfo != null) {
      this.specification.specificationInvoice = {
        entityType: EntityType.Specification,
        fileName: fileInfo.fileName,
        type: DocumentType.Specification,
        fileSize: fileInfo.fileSize,
        fileUrl: fileInfo.fileUrl
      };
    } else {
      this.specification.specificationInvoice = null;
    }
  }

  save() {
    if (this.specification.specificationInvoice != null) {
      this.uploadSpecification.emit(this.specification);
      }
  }

}
