import { AbstractControl, NG_VALIDATORS, Validator, ValidationErrors, ValidatorFn, FormControl } from "@angular/forms";
import { Directive } from "@angular/core";

@Directive({
    selector: '[digitValidator][ngModel]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: NestedValidator,
            multi: true
        }
    ]
})
export class NestedValidator implements Validator {

    validator: ValidatorFn;

    constructor() {
        this.validator = this.decimal();
    }

    validate(c: AbstractControl): ValidationErrors {
        return this.validator(c);
    }

    integer = (control: AbstractControl): { [key: string]: boolean } => {
        var pattern = /^\d+$/;
        if (pattern.test(control.value))
            return null;

        return { validInteger: true }
    }

    decimal() {
        return (c: FormControl) => {
            var pattern = /\-?\d*\.?\d{1,2}/;
            if (pattern) {
                return null;
            } else {
                return {
                    decimalValidator: {
                        valid: false
                    }
                }
            }
        }
    }


    year = (control: AbstractControl): { [key: string]: boolean } => {
        var pattern = /\d{4}$/;

        if (pattern.test(control.value))
            return null;

        return { validYear: true }
    }

}

export class NumericValidators {
    static integer = (control: AbstractControl): { [key: string]: boolean } => {
        var pattern = /^\d+$/;
        if (pattern.test(control.value))
            return null;

        return { validInteger: true }
    }

    static decimal = (control: AbstractControl): { [key: string]: boolean } => {
        var pattern = /\-?\d*\.?\d{1,2}/;
        if (pattern.test(control.value))
            return null;
        return { validDecimal: true }
    }

    static year = (control: AbstractControl): { [key: string]: boolean } => {
        var pattern = /^[0-9]{4}[:.,-]?$/;

        if (pattern.test(control.value))
            return null;

        return { validYear: true }
    }

}