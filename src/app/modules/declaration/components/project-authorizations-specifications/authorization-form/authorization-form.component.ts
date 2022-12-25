import { Association } from './../../../../../shared/models/Association';
import { FileUploadService } from './../../../../../core/services/fileUpload/file-upload.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, OnChanges } from '@angular/core';
import { DropzoneConfigInterface, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { Authorization } from '@shared/models/Authorization';
import { CommonService } from '@shared/services/common/common.service';
import { EntityType } from '@shared/models/Enums/EntityType';
import { DocumentType } from '@shared/models/Enums/DocumentType';
import { ConverterService } from '@shared/converters/converterService';
import { NgbDateAdapter, NgbDateNativeUTCAdapter } from '@ng-bootstrap/ng-bootstrap';
import { Document } from '@shared/models/document';

@Component({
  selector: 'tia-authorization-form',
  templateUrl: './authorization-form.component.html',
  styleUrls: ['./authorization-form.component.scss'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeUTCAdapter}]
})
export class AuthorizationFormComponent implements OnInit, OnChanges {
  associations: Association[] = [];
  authorization = new  Authorization();
  authorizationInvoice = new Document();
  acceptedFiles = 'application/pdf';
  showData?: boolean;
  declarationId: number;
  @Input() uploadConfig: any;
  @Output() uploadAuthorization = new EventEmitter();


  constructor(private commonService: CommonService,
               private uploadService: FileUploadService,
               private converterService: ConverterService) { }

  ngOnInit() {
    this.commonService.getAssociations().subscribe((res) => {
      this.associations = res;
    });
  }
  ngOnChanges() {
    if (this.uploadConfig.value) {
      this.authorization = Object.assign({}, this.uploadConfig.value);
      this.authorization.issueDate = this.authorization.issueDate ? this.converterService.ConvertDate(this.authorization.issueDate) : null;
      console.log(this.uploadConfig.showData);

      this.showData = this.uploadConfig.showData;
      this.authorizationInvoice = this.authorization.authorizationInvoice;
    }
  }
  GetAuthorizationUrl(fileInfo: Document){
    if (fileInfo != null) {
      this.authorization.authorizationInvoice = {
        entityType: EntityType.Authorization,
        fileName: fileInfo.fileName,
        type: DocumentType.Authorization,
        fileSize: fileInfo.fileSize,
        fileUrl: fileInfo.fileUrl
      };
    } else {
      this.authorization.authorizationInvoice = null;
    }
  }

  compareById(n1,n2) {
    if (n1 == null || n2 == null) {
      return false;
    }
    return n1.id == n2.id;
  }
  save() {
    if (this.authorization.authorizationInvoice != null) {
    this.uploadAuthorization.emit(this.authorization);
    }
  }

}
