import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IApplicationState, ILogList } from '../../state';
import { loadLogs } from '../../actions/lists/commands';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'logs',
    templateUrl: './logs.html'
})
export class LogsComponent implements OnInit {
    
    public logList: ILogList = { entries: [], filter: null, name: '', pager: null };

    constructor(private store: Store<IApplicationState>, private activeRoute: ActivatedRoute) {}

    ngOnInit(): void {
        this.activeRoute.params.subscribe(params => {
            var appName = params.name;

            this.store
                .select(s => s.lists)
                .map(l => l.find(list => list.name === appName))
                .filter(l => l != null)
                .subscribe(l => {
                    this.logList = l;
                });

            this.store
                .select(s => s.registrations)
                .map(r => r.find((reg => reg.name === appName)))
                .filter(l => l != null)
                .subscribe(r => {
                    this.store.dispatch(loadLogs(r))
                });
        });
        
    }

}