import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

import { Injectable, Inject } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { COMMAND_TYPES, LoadAiAppsCommand, RegisterAiAppCommand, RemoveAiAppCommand } from '../actions/registrations/commands';
import { aiAppsLoaded, aiAppRegistered, aiAppRemoved } from '../actions/registrations/events';

import { IRegistrationService, REGISTRATION_SERVICE } from '../services/registrations';
import { ILogListRegistration } from '../state/index';

@Injectable()
export class RegistrationsEffects {

    @Effect() load$: Observable<Action> = 
        this.actions$.ofType(COMMAND_TYPES.LOAD_AI_APPS)
            .mergeMap((action: LoadAiAppsCommand) => 
                this.registrationsService.getAll().map(aiAppsLoaded));


    @Effect() register$: Observable<Action> = 
        this.actions$.ofType(COMMAND_TYPES.REGISTER_AI_APP)
            .mergeMap((action: RegisterAiAppCommand) => this.registrationsService.register({
                appId: action.appId,
                appKey: action.appKey,
                loadExceptions: action.loadExceptions,
                name: action.name
            }).map((reg: ILogListRegistration) => aiAppRegistered(action.name, action.appId, action.appKey, action.loadExceptions))
        );

    @Effect() remove$: Observable<Action> =
        this.actions$.ofType(COMMAND_TYPES.REMOVE_AI_APP)
            .mergeMap((action: RemoveAiAppCommand) => 
                this.registrationsService.remove(action.appId).map(() => aiAppRemoved(action.appId))
        );

    constructor(
        private actions$: Actions,
        @Inject(REGISTRATION_SERVICE) private registrationsService: IRegistrationService
      ) {}

}