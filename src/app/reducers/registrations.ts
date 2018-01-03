import { Action } from '@ngrx/store';
import { ILogListRegistration } from '../state';

import { AiAppRegisteredEvent, AiAppRemovedEvent, AiAppsLoadedEvent, EVENT_TYPES } from '../actions/registrations/events';

export function registrationsReducer(state: ILogListRegistration[] = [], action: Action): ILogListRegistration[] {

    switch(action.type) {
        case EVENT_TYPES.AI_APP_REGISTERED: {
            const evt: AiAppRegisteredEvent = <AiAppRegisteredEvent>action;
            return [...state, { appId: evt.appId, appKey: evt.appKey, name: evt.name, loadExceptions: evt.loadExceptions }];
        }
        case EVENT_TYPES.AI_APP_REMOVED: {
            const evt: AiAppRemovedEvent = <AiAppRemovedEvent>action;

            return state.filter(reg => reg.appId !== evt.appId);
        }
        case EVENT_TYPES.AI_APPS_LOADED: {
            const evt: AiAppsLoadedEvent = <AiAppsLoadedEvent>action;

            return evt.aiApps;
        }
        default: {
            return state;
        }
    }
}