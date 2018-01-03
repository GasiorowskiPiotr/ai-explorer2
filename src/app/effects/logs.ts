import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

import { Injectable, Inject } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { COMMAND_TYPES, LoadLogsCommand } from '../actions/lists/commands';

import { IApplicationInsightsService, APPLICATION_INSIGHTS_SERVICE } from '../services/applicationInsigts';
import { logsLoaded } from '../actions/lists/events';
import { loadingStarted, loadingSucceeded } from '../actions/ui/events';

@Injectable()
export class LogsEffects {

    @Effect() load$: Observable<Action> = 
        this.actions$.ofType(COMMAND_TYPES.LOAD_LOGS)
            .mergeMap((action: LoadLogsCommand) => {
                return Observable.create(observer => {
                    observer.next(loadingStarted());
                    this.aiService.load(
                        action.app, 
                        action.filter, 
                        action.pager)
                    .subscribe((entries) => {
                        observer.next(logsLoaded(entries, action.app, action.pager, action.filter));
                        observer.next(loadingSucceeded());
                        observer.complete();
                    });
                });
            });

    constructor(
        private actions$: Actions,
        @Inject(APPLICATION_INSIGHTS_SERVICE) private aiService: IApplicationInsightsService
    ) {}
}