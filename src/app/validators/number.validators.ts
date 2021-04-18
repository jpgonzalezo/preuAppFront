import { FormControl } from '@angular/forms';

export interface ValidationResult {
    [key: string]: boolean;
}

export class ValidatorNumber {

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