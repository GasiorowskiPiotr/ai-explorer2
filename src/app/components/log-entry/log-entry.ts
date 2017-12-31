import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { IApplicationState, ILogEntry } from '../../state';


@Component({
    selector: 'log-entry',
    templateUrl: './log-entry.html'
})
export class LogEntryComponent implements OnInit {
    
    private logEntry: ILogEntry;
    private customDimensions: { key: string, value: any }[] = [];

    constructor(private activatedRoute: ActivatedRoute, private store: Store<IApplicationState>) {

    }


    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            const appName = params.name;
            const eventId = params.eventId;

            this.store
                .select(e => e.lists)
                .map(l => l.find(list => list.name === appName))
                .filter(l => l != null)
                .map(list => list.entries.find(entry => entry.id === eventId))
                .subscribe(entry => {
                    this.logEntry = entry;
                    this.customDimensions = Object
                        .keys(this.logEntry.customDimensions)
                        .map(key => ({ key, value: this.logEntry.customDimensions[key] }));
                });

            window.scrollTo(0, 0); // HACK: Need to change that!
        });
    }

}