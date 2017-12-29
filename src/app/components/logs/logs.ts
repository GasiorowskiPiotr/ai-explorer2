import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IApplicationState, ILogList } from '../../state';
import { loadLogs } from '../../actions/lists/commands';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
    selector: 'logs',
    templateUrl: './logs.html'
})
export class LogsComponent implements OnInit {
    
    private logList: ILogList;

    constructor(private store: Store<IApplicationState>, private activeRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.activeRoute.params.subscribe(params => {
            var appName = params.name;

            this.store
                .select(s => s.lists)
                .map(l => l.find(list => list.name === appName))
                .subscribe(l => {
                    this.logList = l;
                    console.log(l);
                });

            this.store
                .select(s => s.registrations)
                .map(r => r.find((reg => reg.name === appName)))
                .subscribe(r => {
                    this.store.dispatch(loadLogs(r))
                });
        });
        
    }

}