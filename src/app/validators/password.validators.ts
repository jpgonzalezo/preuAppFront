import { FormControl } from '@angular/forms';

export interface ValidationResult {
    [key: string]: boolean;
}

export class PasswordValidatorNumber {

    public static strong(control: FormControl): ValidationResult {
        let hasNumber = /\d/.test(control.value);
        const valid = hasNumber;
        if (!valid) {
            // return what´s not valid
            return { 
                notNumber: true };
        }
        return null;
    }
}

export class PasswordValidatorUpper {

    public static strong(control: FormControl): ValidationResult {
        let hasUpper = /[A-Z]/.test(control.value);
        const valid = hasUpper;
        if (!valid) {
            // return what´s not valid
            return { 
                notUpper: true };
        }
        return null;
    }
}

export class PasswordValidatorLower {

    public static strong(control: FormControl): ValidationResult {
        let hasLower = /[a-z]/.test(control.value);
        const valid = hasLower;
        if (!valid) {
            // return what´s not valid
            return { 
                notLower: true };
        }
        return null;
    }
}
