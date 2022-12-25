import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OrientationService } from '@core/services/Orientation/orientation.service';
import { Orientation } from '@shared/models/Orientation';
import { StepperService, StepRoute } from '@shared/services/stepper.service';
import { BusinessInformationComponent } from '../business-information/business-information.component';
import { CompanyInformationComponent } from '../company-information/company-information.component';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Component({
  selector: 'tia-orientation',
  templateUrl: './orientation.component.html',
  styleUrls: ['./orientation.component.scss'],
})
export class OrientationComponent implements OnInit {

  orientation: Orientation;
  declarationId: number;
  private isEdit = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private orientationService: OrientationService,
    private stepperService: StepperService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const id = +params['id'];
      this.declarationId = id;
      if (!isNaN(id)) {
        this.orientationService.getById(id)
          .subscribe((orientation: Orientation) => {
            this.orientation = orientation;
            this.isEdit = true
          });
      } else {
        this.orientation = new Orientation();
      }
    })
  }

  save(orientation: Orientation) {
    if (!this.isEdit) {
      this.orientationService.insert(orientation).subscribe((orientation: Orientation) => {
        this.orientation = orientation;
        this.router.navigate([`service-declaration/${orientation.id}/edit`]);
      }, err => {
          this.toastr.warning('the initial project reference does not exist ', 'invalid informations');
      });
    } else {
      orientation.declarationId = this.declarationId;
      orientation.screenId = this.stepperService.activatedStep.id + 1;
      this.orientationService.update(orientation, orientation.id)
        .subscribe((orientation: Orientation) => {
          if (orientation.promotor.type === 1 || orientation.project.type !== 0) {
            this.onCorporateBody(true);
          } else {
            this.onCorporateBody(false);
          }
          orientation.project.type !== 0 ? this.onCompanyInformation(false) : this.onCompanyInformation(true);
          this.stepperService.forward();
        }, (err: HttpErrorResponse) => {
          this.toastr.error('the initial project reference not found ', 'invalid informations');
        });
    }
  }
  SaveDraft(orientation: Orientation) {
    if (this.isEdit) {
      orientation.declarationId = this.declarationId;
      orientation.screenId = this.stepperService.activatedStep.id;
      this.orientationService.update(orientation, orientation.id)
        .subscribe(_ => orientation.screenId = this.stepperService.activatedStep.id);
    }
  }

  private onCorporateBody(active: boolean = false) {
    const route: StepRoute = { title: 'Business information', component: BusinessInformationComponent };
    if (active) {
      if (!this.stepperService.routes.find(r => r.title == route.title)) {
        this.stepperService.addRoute(route, { position: 1 });
      }
    } else {
      if (this.stepperService.routes.find(r => r.title == route.title)) {
        this.stepperService.removeRoute(route, { position: 1 });
      }
    }
  }
  private onCompanyInformation(active: boolean = true) {
    const route: StepRoute = { title: 'Information about the company to create', component: CompanyInformationComponent }
    if (!active) {
      if (this.stepperService.routes.find(r => r.title == route.title)) {
        this.stepperService.removeRoute(route, { position: 1 });
      }
    } else {
      if (!this.stepperService.routes.find(r => r.title == route.title)) {
        this.stepperService.addRoute(route, { position: 2 });
      }
    }
  }


}
