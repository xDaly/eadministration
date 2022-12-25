import { PromotorType } from './../../../../../shared/models/Enums/PromotorType';
import { AfterViewChecked, Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren, OnChanges } from '@angular/core';
import { FileUploadService } from '@core/services/fileUpload/file-upload.service';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BusinessCompanyInformation } from '@shared/models/BusinessCompanyInformation';
import { Document } from '@shared/models/document';
import { LegalForm } from '@shared/models/LegalForm';
import { CommonService } from '@shared/services/common/common.service';
import { StepperService } from '@shared/services/stepper.service';
import { DropzoneConfigInterface, DropzoneDirective } from 'ngx-dropzone-wrapper';
import { ToastrService } from 'ngx-toastr';
import { EntityType } from '@shared/models/Enums/EntityType';
import { DocumentType } from '@shared/models/Enums/DocumentType';
import { ProjectType } from '@shared/models/Enums/ProjectType';

@Component({
  selector: 'tia-business-information-form',
  templateUrl: './business-information-form.component.html',
  styleUrls: ['./business-information-form.component.scss']
})
export class BusinessInformationFormComponent implements OnInit, OnChanges {

  @Input() businessInformation: BusinessCompanyInformation;

  publicSaving = false;
  LegalRepresentativeAcceptedFiles = 'image/*';
  CommerciaRegisterCopyAcceptedFile = 'application/pdf';
  LastBalanceCheckAcceptedFile = 'application/pdf';
  joinedAccountAcceptedFile = 'application/pdf';
  projectType: ProjectType;
  promotorType: PromotorType;
  legalForms: Array<LegalForm> = [];
  legalRepresentativeDocumentInvoice = new Document();
  commercialRegisterDocumentInvoice = new Document();
  lastBalanceCheckDocumentInvoice = new Document();
  joinedAccountInvoice: Document = new Document();
  phoneNumb: any;
  faxNumb: any;

  @Output() next = new EventEmitter();
  @Output() saveDraft = new EventEmitter();
  constructor(
    private commonService: CommonService,
    private toastr: ToastrService,
    private UploadService: FileUploadService,
    private stepperService: StepperService) { }

  ngOnChanges() {
    if (this.businessInformation.legalRepresentativeIdentityPiece != null) {
      this.legalRepresentativeDocumentInvoice = this.businessInformation.legalRepresentativeIdentityPiece;
    }
    if (this.businessInformation.commercialRegisterCopy != null) {
      this.commercialRegisterDocumentInvoice = this.businessInformation.commercialRegisterCopy;
    }
    if (this.businessInformation.lastBalanceCheckInvoice != null) {
      this.lastBalanceCheckDocumentInvoice = this.businessInformation.lastBalanceCheckInvoice;
    }
    if (this.businessInformation.joinedAccountInvoice != null) {
      this.joinedAccountInvoice = this.businessInformation.joinedAccountInvoice;
    }
    if (this.businessInformation.legalFormId === 3) {
      this.publicSaving = true;
    } else {
      this.publicSaving = false;
    }
    if (this.businessInformation.projectType != null) {
    this.projectType = this.businessInformation.projectType;
    this.promotorType = this.businessInformation.promotorType;
    this.phoneNumb = this.businessInformation.phoneNumber;
    this.faxNumb = this.businessInformation.faxNumber;
    }

  }

  ngOnInit() {
    this.commonService.getLegalForms().subscribe((legalForms: Array<LegalForm>) => this.legalForms = legalForms);
  }
  GetLegalRepresentativeIdFileName(fileInfo: Document) {
    if (fileInfo != null) {
      this.businessInformation.legalRepresentativeIdentityPiece = {
        entityType : EntityType.Company,
        fileName: fileInfo.fileName,
        type: DocumentType.LegalRepresentativeIdentityDocument,
        fileSize: fileInfo.fileSize,
        fileUrl: fileInfo.fileUrl
      };
    } else {
      this.businessInformation.legalRepresentativeIdentityPiece = null;
    }
  }
  GetCommericialRegisterFileName(fileInfo: Document) {
    if (fileInfo != null) {
      this.businessInformation.commercialRegisterCopy = {
        entityType: EntityType.Company,
        fileName: fileInfo.fileName,
        type: DocumentType.CommercialRegisterCopy,
        fileSize: fileInfo.fileSize,
        fileUrl: fileInfo.fileUrl
      };
    } else {
      this.businessInformation.commercialRegisterCopy = null;
    }
  }
  GetLastBalanceCheckFileName(fileInfo: Document) {
    if (fileInfo != null) {
      this.businessInformation.lastBalanceCheckInvoice =  {
        entityType: EntityType.Company,
        fileName: fileInfo.fileName,
        type: DocumentType.LastBalanceInvoice,
        fileSize: fileInfo.fileSize,
        fileUrl: fileInfo.fileUrl
      };
    } else {
      this.businessInformation.lastBalanceCheckInvoice = null;
    }
  }
  GetJoinedAccountInvoice(fileInfo: Document) {
    if (fileInfo != null) {
      this.businessInformation.joinedAccountInvoice = {
        entityType: EntityType.Company,
        fileName: fileInfo.fileName,
        type: DocumentType.JoinedAccountInvoice,
        fileSize: fileInfo.fileSize,
        fileUrl: fileInfo.fileUrl
      };
    } else {
      this.businessInformation.joinedAccountInvoice = null;
    }
  }

  verifyLegalForm() {
    const legalFormDescription = this.legalForms.find(legalForm => legalForm.id === this.businessInformation.legalFormId);
    if (legalFormDescription.description) {
      this.toastr.info(legalFormDescription.description, 'legal form description information');
    }
    if (this.businessInformation.legalFormId === 3) {
      this.publicSaving = true;
    } else {
      this.publicSaving = false;
    }
  }
  save() {
    if (this.businessInformation.projectType === 0 && this.businessInformation.legalRepresentativeIdentityPiece && this.businessInformation.commercialRegisterCopy) {
      this.next.emit(this.businessInformation);
    } else if (this.businessInformation.projectType !== 0 ) {
      this.businessInformation.phoneNumber = this.phoneNumb.number;
      this.businessInformation.faxNumber = this.faxNumb ? this.faxNumb.number : null;
      if ((this.promotorType === 0 && this.businessInformation.commercialRegisterCopy) ||
       (this.promotorType === 1 && this.businessInformation.legalRepresentativeIdentityPiece && this.businessInformation.commercialRegisterCopy && this.businessInformation.lastBalanceCheckInvoice && this.businessInformation.joinedAccountInvoice)) {
      this.next.emit(this.businessInformation);
      }
    }
  }
  SaveDraft() {
    this.stepperService.refrechSteps();
    this.saveDraft.emit(this.businessInformation);
  }

}
