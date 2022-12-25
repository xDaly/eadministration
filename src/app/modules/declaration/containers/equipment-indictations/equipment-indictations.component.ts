import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { DeclarationService } from '@core/services/declaration/declaration.service';
import { EquipmentService } from '@core/services/declaration/equipment.service';
import { Declaration } from '@shared/models/Declaration.model';
import { Equipement } from '@shared/models/equipment.model';
import { Project } from '@shared/models/project.model';
import { StepperService } from '@shared/services/stepper.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'tia-equipment-indictations',
  templateUrl: './equipment-indictations.component.html',
  styleUrls: ['./equipment-indictations.component.scss']
})
export class EquipmentIndictationsComponent implements OnInit {

  declaration: Declaration;
  project: Project;
  equipmentsList: Array<Equipement>;

  constructor(
    private route: ActivatedRoute,
    private stepperService: StepperService,
    private toster: ToastrService,
    private declarationService: DeclarationService,
    private equipmentService: EquipmentService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.declarationService.getById(+params['id']).subscribe((daclaration: Declaration) => {
        this.equipmentService.filterBy({ name: 'project', value: daclaration.project.id })
          .subscribe(list => this.equipmentsList = list);
        this.project = daclaration.project;
        this.declaration = daclaration;
      })
    })
  }

  getEquipement(equipement) {
    equipement.body.projectId = this.project.id;
    let index = this.equipmentsList.findIndex((result) => result.id === equipement.body.id);
    switch (equipement.action) {
      case 'create':
        this.equipmentService.insert(equipement.body)
          .subscribe((result: Equipement) => this.equipmentsList.push(result))
        break;
      case 'edit':
        this.equipmentService.update(equipement.body, equipement.body.id)
          .subscribe((equipement: Equipement) => this.equipmentsList[index] = equipement)
        break;
      case 'delete':
        this.equipmentService.delete(equipement.body.id).subscribe(_ => this.equipmentsList.splice(index, 1))
        break;
    }
  }

  next() {
    this.declaration.currentStep = 7;
    this.declarationService.update(this.declaration, this.declaration.id)
      .subscribe((declaration: Declaration) => {
        this.declaration = declaration;
        this.stepperService.forward();
      })
  }
}


