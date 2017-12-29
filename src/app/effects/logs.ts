import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

import { Injectable, Inject } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { COMMAND_TYPES, LoadLogsCommand } from '../actions/lists/commands';

import { IApplicationInsightsService, APPLICATION_INSIGHTS_SERVICE } from '../services/applicationInsigts';
import { logsLoaded } from '../actions/lists/events/index';

@Injectable()
export class LogsEffects {

    @Effect() load$: Observable<Action> = 
        this.actions$.ofType(COMMAND_TYPES.LOAD_LOGS)
            .mergeMap((action: LoadLogsCommand) => 
                this.aiService.load(
                    action.app, 
                    action.filter, 
                    action.pager)
                .map((entries) => {
                    return logsLoaded(entries, action.app, action.pager, action.filter);
                }
                    )
            );

    constructor(
        private actions$: Actions,
        @Inject(APPLICATION_INSIGHTS_SERVICE) private aiService: IApplicationInsightsService
    ) {}
}