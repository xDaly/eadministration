import { Component, EventEmitter, Input, OnChanges, OnInit, Output, DoCheck, SimpleChanges } from '@angular/core';
import { BusinessInformationComponent } from '@modules/declaration/containers/business-information/business-information.component';
import { Item, Orientation, Project, Promotor } from '@shared/models/Orientation';
import { ActivitiesService } from '@shared/services/common/activities.service';
import { StepperService, StepRoute } from '@shared/services/stepper.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DeclarationService } from '@core/services/declaration/declaration.service';
import { SettingsService } from '@shared/services/common/settings.service';


@Component({
  selector: 'tia-orientation-form',
  templateUrl: './orientation-form.component.html',
  styleUrls: ['./orientation-form.component.scss']
})
export class OrientationFormComponent implements OnInit, OnChanges {

  activityFields$: Observable<Array<Item>>;
  sectors$: Observable<Array<Item>>;
  activities$: Observable<Array<Item>>;
  subActivities$: Observable<Array<Item>>;
  secondaryActivities$: Observable<Array<Item>>;

  @Input() orientation: Orientation;

  @Output() orientationOutput = new EventEmitter<Orientation>();
  @Output() orientationDraft = new EventEmitter<Orientation>();

  constructor(
    private toastr: ToastrService,
    private settingsService: SettingsService,
    private activitiesService: ActivitiesService
  ) { }

  ngOnInit() {
    this.activityFields$ = this.activitiesService.getFields();
    this.secondaryActivities$ = this.activitiesService.getSecondaryActivities();
  }

  ngOnChanges() {
    if (this.orientation) {
    this.orientation.project
      ? this.orientation.project
      : this.orientation.project = new Project();

    this.orientation.promotor
      ? this.orientation.promotor
      : this.orientation.promotor = new Promotor();

    this.orientation.activityField
      ? this.sectors$ = this.activitiesService.getSectorByActivityField(this.orientation.activityField.id)
      : this.orientation.activityField = new Item();

    this.orientation.sector
      ? this.activities$ = this.activitiesService.getActivitiesBySector(this.orientation.sector.id)
      : this.orientation.sector = new Item();

    this.orientation.activity
      ? this.subActivities$ = this.activitiesService.getSubActivitiesByActivity(this.orientation.activity.id)
      : this.orientation.activity = new Item();

    this.orientation.subActivity
      ? this.orientation.subActivity
      : this.orientation.subActivity = new Item();

    this.orientation.secondaryActivity
      ? this.orientation.secondaryActivity
      : this.orientation.secondaryActivity = new Item();
  }
}

  getSectors(id) {
    this.sectors$ = this.activitiesService.getSectorByActivityField(id);
    this.orientation.sector.id = 0;
    this.orientation.activity.id = 0;
    this.orientation.subActivity.id = 0;
    this.orientation.secondaryActivity.id = 0;
  }

  getActivities(id) {
    this.activities$ = this.activitiesService.getActivitiesBySector(id);
  }

  getSubActivities(id) {
    this.subActivities$ = this.activitiesService.getSubActivitiesByActivity(id);
  }

  save() {
    if (this.orientation.project.investmentCost < this.settingsService.current.minInvestmentCost) {
      this.toastr.warning(`Dear investor, the Tunisian Investment Authority informs you that the online investment declaration service is currently available for investment projects that cost more than ${this.settingsService.current.minInvestmentCost} TND.`)
      return;
    }

    this.orientationOutput.emit(this.orientation);
  }

  SaveDraft() {
    this.orientationDraft.emit(this.orientation);
  }

  _activetedProjectMode(){
    return this.orientation.project.type !== -1
  }
}

