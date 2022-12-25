import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SplatMap } from './dynamic-table.service';

@Component({
    selector: 'tia-field',
    template: `
    <div class="control" [formGroup]="form" *ngIf="splat.key !== splat.label">
        <label [attr.for]="splat.key" [class.required]="!isValid">{{splat.label}}</label>

        <div [ngSwitch]="splat.controlType">

            <input class="form-control" *ngSwitchCase="'textbox'" [formControlName]="splat.key"
                    [id]="splat.key" [type]="splat.type">

            <select class="form-control" [id]="splat.key" *ngSwitchCase="'dropdown'" [formControlName]="splat.key">
            <option *ngFor="let opt of splat.options" [value]="opt.key">{{opt.value}}</option>
            </select>

        </div> 
    </div>
    `
})
export class DynamicFormFieldComponent implements OnInit {
    @Input() splat: SplatMap;
    @Input() form: FormGroup;
    get isValid() { return this.form.controls[this.splat.key].valid; }

    constructor() { }

    ngOnInit(): void { }
}
