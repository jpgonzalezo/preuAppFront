import { FormControl } from '@angular/forms';

export interface ValidationResult {
    [key: string]: boolean;
}

export class ValidatorLink {

    public static strong(control: FormControl): ValidationResult {
        let isYoutube = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(control.value);
        const valid = isYoutube;
       
        if (!valid) {
            // return what´s not valid
            return { notYoutube: true };
        }
        return null;
    }
}