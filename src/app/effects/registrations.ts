import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';

import { Injectable, Inject } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { COMMAND_TYPES, LoadAiAppsCommand } from '../actions/registrations/commands';
import { aiAppsLoaded } from '../actions/registrations/events';

import { IRegistrationService, REGISTRATION_SERVICE } from '../services/registrations';

@Injectable()
export class RegistrationsEffects {

    @Effect() load$: Observable<Action> = 
        this.actions$.ofType(COMMAND_TYPES.LOAD_AI_APPS)
            .mergeMap((action: LoadAiAppsCommand) => 
                this.registrationsService.getAll().map(aiAppsLoaded));


    constructor(
        private actions$: Actions,
        @Inject(REGISTRATION_SERVICE) private registrationsService: IRegistrationService
      ) {}

}