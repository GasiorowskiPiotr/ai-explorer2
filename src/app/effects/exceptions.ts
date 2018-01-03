import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

import { Injectable, Inject } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { COMMAND_TYPES, LoadExceptionsCommand } from '../actions/exceptions/commands';

import { IApplicationInsightsService, APPLICATION_INSIGHTS_SERVICE } from '../services/applicationInsigts';
import { exceptionsLoaded } from '../actions/exceptions/events';
import { loadingStarted, loadingSucceeded } from '../actions/ui/events';

@Injectable()
export class ExceptionsEffects {

    @Effect() load$: Observable<Action> = 
        this.actions$.ofType(COMMAND_TYPES.LOAD_EXCEPTIONS)
            .mergeMap((action: LoadExceptionsCommand) => {
                return Observable.create((observer) => {
                    observer.next(loadingStarted());
                    this.aiService.getExceptionCounts(action.registrations)
                    .subscribe((entries) => {
                        observer.next(exceptionsLoaded(entries));
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