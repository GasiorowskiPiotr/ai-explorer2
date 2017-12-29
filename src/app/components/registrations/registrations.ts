import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';

import { IApplicationState, ILogListRegistration, IExceptionEntry } from '../../state';
import { removeAiApp } from '../../actions/registrations/commands'

@Component({
    selector: 'registrations',
    templateUrl: './registrations.html',
    styleUrls: ['./registrations.css']
})
export class RegistrationsComponent implements OnInit {
    
    public registrations: {registration: ILogListRegistration, exceptions: IExceptionEntry}[] = [];

    constructor(private store: Store<IApplicationState>, private router: Router) {
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

    onRemoveAppRequested($event: string) {
        const appId = $event;

        this.store.dispatch(removeAiApp(appId));
    }

    onExploreLogsRequested($event: string) {
        const appName = $event;

        this.router.navigate(['logs', appName]);
    }

}