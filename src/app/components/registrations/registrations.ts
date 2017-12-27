import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store';

import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';

import { IApplicationState, ILogListRegistration, IExceptionEntry } from '../../state';

@Component({
    selector: 'registrations',
    templateUrl: './registrations.html',
    styleUrls: ['./registrations.css']
})
export class RegistrationsComponent implements OnInit {
    
    private registrations: {registration: ILogListRegistration, exceptions: IExceptionEntry}[] = [];

    constructor(private store: Store<IApplicationState>) {
    }

    ngOnInit(): void {
        const registrations = this.store.select(s => s.registrations);
        const exceptions = this.store.select(s => s.exceptions);

        Observable.combineLatest(registrations, exceptions, (regs, excs) => ([
            ...regs.map((reg) => ({
                registration: reg,
                exceptions: (excs || []).find((e) => e.appId === reg.appId)
            }))
        ])).subscribe(res => {
            this.registrations = res;
        });
        
    }

}