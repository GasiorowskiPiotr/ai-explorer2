import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

import { Injectable, Inject } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { COMMAND_TYPES, LoadExceptionsCommand } from '../actions/exceptions/commands';

import { IApplicationInsightsService, APPLICATION_INSIGHTS_SERVICE } from '../services/applicationInsigts';
import { exceptionsLoaded } from '../actions/exceptions/events';

@Injectable()
export class ExceptionsEffects {

    @Effect() load$: Observable<Action> = 
        this.actions$.ofType(COMMAND_TYPES.LOAD_EXCEPTIONS)
            .mergeMap((action: LoadExceptionsCommand) => 
                this.aiService.getExceptionCounts(action.registrations)
                    .map((entries) => {
                        return exceptionsLoaded(entries);
                    })
            );

    constructor(
        private actions$: Actions,
        @Inject(APPLICATION_INSIGHTS_SERVICE) private aiService: IApplicationInsightsService
    ) {}
}