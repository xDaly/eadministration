import { AfterViewChecked, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FileUploadService } from '@core/services/fileUpload/file-upload.service';
import { OrientationService } from '@core/services/Orientation/orientation.service';
import { NgbDateAdapter, NgbDateNativeUTCAdapter } from '@ng-bootstrap/ng-bootstrap';
import { ConverterService } from '@shared/converters/converterService';
import { BaseModel } from '@shared/models/BaseModel';
import { Declarant } from '@shared/models/Declarant';
import { Document } from '@shared/models/document';
import { DeclarentQuality } from '@shared/models/Enums/DeclarentQuality';
import { DocumentType } from '@shared/models/Enums/DocumentType';
import { EntityType } from '@shared/models/Enums/EntityType';
import { Gender } from '@shared/models/Enums/Gender';
import { IdentityPieceType } from '@shared/models/Enums/IdentityDocumentType';
import { LocationsService } from '@shared/services/common/Locations.service';
import { StepperService } from '@shared/services/stepper.service';




@Component({
  selector: 'tia-declarant-form',
  templateUrl: './declarant-form.component.html',
  styleUrls: ['./declarant-form.component.scss'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeUTCAdapter }]
})
export class DeclarantFormComponent implements OnInit, AfterViewChecked, OnChanges {

  IdentityPieceTypes = IdentityPieceType;
  DeclarentQualities = DeclarentQuality;
  Genders = Gender;
  acceptedFiles = 'image/*';
  IdentityDocumentInvoice = new Document();
  ManadatorDocumentInovice = new Document();
  isAgent = false;
  isNaturalPerson = true;
  countries: BaseModel[] = [];
  phoneNumb: any;
  faxNumb: any;


  @Input() declarant: Declarant;

  @Output() saveDraft = new EventEmitter();
  @Output() declarentOutput = new EventEmitter<Declarant>();



  constructor(private locationService: LocationsService,
    private stepperService: StepperService,
    private UploadService: FileUploadService,
    private orientationService: OrientationService,
    private converterService: ConverterService) { }
  ngAfterViewChecked() {

  }
  ngOnInit() {
    this.locationService.getNationalities().subscribe(res => this.countries = res);

  }
  ngOnChanges() {
    if (this.declarant) {
      this.declarant.birthDate = this.declarant.birthDate ? this.converterService.ConvertDate(this.declarant.birthDate) : null;
      this.declarant.issueDate = this.declarant.issueDate ? this.converterService.ConvertDate(this.declarant.issueDate) : null;
      this.phoneNumb = this.declarant.phoneNumber;
      this.faxNumb = this.declarant.faxNumber;
      this.isAgent = this.declarant.quality == this.DeclarentQualities.Agent ? true : false;
      if (this.declarant.promotorIdentityDocument != null) {
        this.IdentityDocumentInvoice = this.declarant.promotorIdentityDocument;
      }
      if (this.declarant.mandatorIdentityDocument != null) {
        this.ManadatorDocumentInovice = this.declarant.mandatorIdentityDocument;
      }
    }
  }
  GetIdentityDocumentFileName(fileInfo: Document) {
    if (fileInfo != null) {
      this.declarant.promotorIdentityDocument = {
        entityType: EntityType.Promotor,
        fileName: fileInfo.fileName,
        type: DocumentType.PromotorIdentityDocument,
        fileSize: fileInfo.fileSize,
        fileUrl: fileInfo.fileUrl
      };
    } else {
      this.declarant.promotorIdentityDocument = null;
    }
  }

  GetMandatorIdentityDocumentFileName(fileInfo: Document) {
    if (fileInfo != null) {

      this.declarant.mandatorIdentityDocument = {
        entityType: EntityType.Promotor,
        fileName: fileInfo.fileName,
        type: DocumentType.MandatorIdentityDocument,
        fileSize: fileInfo.fileSize,
        fileUrl: fileInfo.fileUrl
      };

    } else {
      this.declarant.mandatorIdentityDocument = null;
    }
  }
  GetQuality() {
    this.isAgent = this.declarant.quality == this.DeclarentQualities.Agent ? true : false;
  }
  deleteIdentityDocument() {
    this.declarant.promotorIdentityDocument = null;
  }
  deleteMandatorDocument() {
    this.declarant.mandatorIdentityDocument = null;
  }

  save() {
    this.declarant.phoneNumber = this.phoneNumb.number;
    this.declarant.faxNumber = this.faxNumb ? this.faxNumb.number : null;
    if (this.isAgent && this.declarant.promotorIdentityDocument && this.declarant.mandatorIdentityDocument) {
      this.declarentOutput.emit(this.declarant);
    }
    if (!this.isAgent && this.declarant.promotorIdentityDocument) {
      this.declarentOutput.emit(this.declarant);
    }
  }
  
  SaveDraft() {
    this.saveDraft.emit(this.declarant)
  }


}
