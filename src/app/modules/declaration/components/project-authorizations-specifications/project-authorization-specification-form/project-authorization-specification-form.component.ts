import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthorizationService } from '@core/services/authorization/authorization.service';
import { FileUploadService } from '@core/services/fileUpload/file-upload.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Authorization } from '@shared/models/Authorization';
import { StepperService } from '@shared/services/stepper.service';
import { InvoiceUploadComponent } from '../invoice-upload/invoice-upload.component';
import { SpecificationService } from '@core/services/specification/specification.service';
import { Specification } from '@shared/models/Specification';
import { DocumentType } from '@shared/models/Enums/DocumentType';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DeclarationService } from '@core/services/declaration/declaration.service';
@Component({
  selector: 'tia-project-authorization-specification-form',
  templateUrl: './project-authorization-specification-form.component.html',
  styleUrls: ['./project-authorization-specification-form.component.scss']
})
export class ProjectAuthorizationSpecificationFormComponent implements OnInit {
  declarationId: number;
  authorizations: Authorization[] = [];
  specifications: Specification[] = [];
  @Output() next = new EventEmitter();
  bsModalRef: NgbModalRef;
  constructor(private modalService: NgbModal,
    private specificationService: SpecificationService,
    private authorizationService: AuthorizationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private uploadService: FileUploadService,
    private stepperService: StepperService,
    private declarationService: DeclarationService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
    const id = +params['id'];
      if (!isNaN(id)) {
        this.declarationId = id;
        this.authorizationService.GetAuthorizationsByDeclarationId(id).subscribe(res => {
          this.authorizations = res;
        }, err => { });
        this.specificationService.GetSpecificationsByDeclarationId(id).subscribe(res => {
          this.specifications = res;
        }, err => { });
      }
    });
  }
  UploadAuthorization() {
    const uploadConfig = {
      documentType: DocumentType.Authorization
    };
    this.bsModalRef = this.modalService.open(InvoiceUploadComponent, { centered: true });
    this.bsModalRef.componentInstance.uploadConfig = uploadConfig;
    this.bsModalRef.result.then((authorization: Authorization) => {
      authorization.declarationId = this.declarationId;
      this.authorizationService.insert(authorization).subscribe((res: any) => {
        this.authorizations.push(res);
      });
    }, reason => {});
  }
  UploadSpecification() {
    const uploadConfig = {
      documentType: DocumentType.Specification
    };
    this.bsModalRef = this.modalService.open(InvoiceUploadComponent, { centered: true });
    this.bsModalRef.componentInstance.uploadConfig = uploadConfig;
    this.bsModalRef.result.then((specification: Specification) => {
      specification.declarationId = this.declarationId;
      this.specificationService.insert(specification).subscribe((res: any) => {
        this.specifications.push(res);
      });
    }, reason => {});
  }
  UpdateAuthorizations(value) {
      const i = this.authorizations.findIndex(o => o == value.authorization);
      if (value.action === 'delete') {
        this.authorizationService.delete(value.authorization.id).subscribe(res => {
          this.declarationService.UpdateDeclarationStep(this.declarationId, this.stepperService.activatedStep.id);
         }, err => { });
        this.authorizations.splice(i, 1);
      } else {
        const uploadConfig = {
          documentType: DocumentType.Authorization,
          value: value.authorization,
          showData: value.action === 'show' ? true : false
        };
        this.bsModalRef = this.modalService.open(InvoiceUploadComponent, { centered: true });
        this.bsModalRef.componentInstance.uploadConfig = uploadConfig;
        this.bsModalRef.result.then((authorization: Authorization) => {
          if (!uploadConfig.showData) {
          this.authorizationService.update(authorization, authorization.id).subscribe((res) => {
            this.authorizations[i] = res as Authorization;
            }, (err) => { });
          }
        }, reason => { }
        );
      }
    }
    UpdateSpecifications(value) {
      const i = this.specifications.findIndex(o => o == value.specification);
      if (value.action === 'delete') {
        this.specificationService.delete(value.specification.id).subscribe(res => {
          this.declarationService.UpdateDeclarationStep(this.declarationId, this.stepperService.activatedStep.id);
         }, err => { });
        this.specifications.splice(i, 1);
      } else {
        const uploadConfig = {
          documentType: DocumentType.Specification,
          value: value.specification,
          showData: value.action === 'show' ? true : false,
        };
        this.bsModalRef = this.modalService.open(InvoiceUploadComponent, { centered: true });
        this.bsModalRef.componentInstance.uploadConfig = uploadConfig;
        this.bsModalRef.result.then((specification: Specification) => {
          if (!uploadConfig.showData) {
            this.specificationService.update(specification, specification.id).subscribe((res) => {
              this.specifications[i] = res as Specification;
              }, (err) => { });
            }
          }, reason => { }
        );
      }
    }
  save() {
    if (this.authorizations.length != 0 && this.specifications.length != 0) {
      this.next.emit();
    }
  }

}
