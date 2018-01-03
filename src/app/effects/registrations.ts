import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

import { Injectable, Inject } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';
import { of } from 'rxjs/observable/of';

import { COMMAND_TYPES, LoadAiAppsCommand, RegisterAiAppCommand, RemoveAiAppCommand, loadAiApps } from '../actions/registrations/commands';
import { aiAppsLoaded, aiAppRegistered, aiAppRemoved } from '../actions/registrations/events';

import { IRegistrationService, REGISTRATION_SERVICE } from '../services/registrations';
import { ILogListRegistration } from '../state/index';
import { Scheduler } from 'rxjs/Scheduler';
import { loadingStarted, loadingSucceeded } from '../actions/ui/events';

@Injectable()
export class RegistrationsEffects {

    @Effect() load$: Observable<Action> = 
        this.actions$.ofType(COMMAND_TYPES.LOAD_AI_APPS)
            .mergeMap((action: LoadAiAppsCommand) => {
                return Observable.create(observer => {
                    observer.next(loadingStarted());
                    this.registrationsService.getAll().subscribe(res => {
                        observer.next(aiAppsLoaded(res));
                        observer.next(loadingSucceeded());
                        observer.complete();
                    });
                });
            });


    @Effect() register$: Observable<Action> = 
        this.actions$.ofType(COMMAND_TYPES.REGISTER_AI_APP)
            .mergeMap((action: RegisterAiAppCommand) => {
                return Observable.create(observer => {
                    observer.next(loadingStarted())
                    this.registrationsService.register({
                        appId: action.appId,
                        appKey: action.appKey,
                        loadExceptions: action.loadExceptions,
                        name: action.name
                    }).subscribe((reg: ILogListRegistration) => {
                        observer.next(aiAppRegistered(action.name, action.appId, action.appKey, action.loadExceptions));
                        observer.next(loadingSucceeded());
                        observer.complete();
                    });
                });
            });

    @Effect() remove$: Observable<Action> =
        this.actions$.ofType(COMMAND_TYPES.REMOVE_AI_APP)
            .mergeMap((action: RemoveAiAppCommand) => {
                    return Observable.create(observer => {
                        observer.next(loadingStarted());
                        this.registrationsService.remove(action.appId).subscribe(() => {
                            observer.next(aiAppRemoved(action.appId));
                            observer.next(loadingSucceeded());
                            observer.complete();
                        });
                    });
                    
                });

    constructor(
        private actions$: Actions,
        @Inject(REGISTRATION_SERVICE) private registrationsService: IRegistrationService
      ) {}

}