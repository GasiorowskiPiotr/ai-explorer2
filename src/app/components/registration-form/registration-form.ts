import { Component, Output, EventEmitter } from '@angular/core';
import { ILogListRegistration } from '../../state';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'registration-form',
    templateUrl: './registration-form.html',
    styleUrls: ['./registration-form.css']
})
export class RegistrationFormComponent {
    
    @Output() public registrationRequested: EventEmitter<ILogListRegistration> = new EventEmitter();

    public form: FormGroup;

    constructor(private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required]],
            appId: ['', [Validators.required]],
            appKey: ['', [Validators.required]],
            loadExceptions: [false]
        });
     }

     onSubmit(): void {
        if(this.form.valid) {
            const formValue = <ILogListRegistration>this.form.value;

            this.registrationRequested.next(formValue);
        }
    }

}