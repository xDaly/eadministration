import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class DynamicTableService {


    list: Array<any> = [];
    private dataSource: BehaviorSubject<Array<any>> = new BehaviorSubject([]);

    constructor() { }

    get getList() { return this.dataSource.getValue }

    set source(data: any) {
        this.list.push(data);
        this.dataSource.next(this.list);
    }

    map(data: Array<any>, splatMap: Array<SplatMap>, option?: SplatMap) {
        return data.map(item => this.applySplat(splatMap, item, option));
    }

    applySplat(splatMap: Array<SplatMap>, entry, option?: SplatMap) {
        const newKeys = splatMap.map((item: SplatMap) => {
            if (entry.hasOwnProperty(item.key)) {
                return { [item.label || item.key || option.key]: entry[item.key] }
            }
        })

        return Object.assign({}, ...newKeys)
    }

    toFormGroup(splatMap: Array<SplatMap>) {
        let group: any = {};

        splatMap.forEach(field => {
            group[field.key] = new FormControl(field.value || '', this.bindValidations(field.validators || []))
        });
        return new FormGroup(group);
    }

    bindValidations(validations: any) {
        if (validations.length > 0) {
            const validList = [];
            validations.forEach(valid => {
                validList.push(valid.validator);
            });
            return Validators.compose(validList);
        }
        return null;
    }

}

export class SplatMap {
    value?: any;
    key: string;
    label?: string;
    validators?: Array<Validator>;
    show?: boolean;
    controlType?: string;
    options?: { key: string, value: string }[] = [];

    constructor(options: {
        value?: string,
        key?: string,
        label?: string,
        validators?: Array<Validator>,
        order?: number,
        show?: boolean,
        controlType?: string
    } = {}) {
        this.value = options.value;
        this.key = options.key || '';
        this.label = options.label || '';
        this.validators = options.validators;
        this.show = options.show || false;
        this.controlType = options.controlType || '';
        this.options = options['options'] || [];
    }
}

export interface Validator {
    name: string;
    validator: any;
    message: string;
}
