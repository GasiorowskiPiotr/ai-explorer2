import { Action } from '@ngrx/store';
import { ILogListRegistration } from '../../../state';

export enum EVENT_TYPES {
    AI_APP_REGISTERED = 'AI_APP_REGISTERED',
    AI_APP_REMOVED = 'AI_APP_REMOVED',
    AI_APPS_LOADED = 'AI_APPS_LOADED'
}


export class AiAppRegisteredEvent implements Action {
    type: string = EVENT_TYPES.AI_APP_REGISTERED;

    constructor(public name: string, public appId: string, public appKey: string, public loadExceptions: boolean) { }
}

export class AiAppRemovedEvent implements Action {
    type: string = EVENT_TYPES.AI_APP_REMOVED;

    constructor(public appId: string) { }
}

export class AiAppsLoadedEvent implements Action {
    type: string = EVENT_TYPES.AI_APPS_LOADED;

    constructor(public aiApps: ILogListRegistration[]) { }
}

export const aiAppRegistered = (name: string, appId: string, appKey: string, loadExceptions: boolean) : AiAppRegisteredEvent => 
    new AiAppRegisteredEvent(name, appId, appKey, loadExceptions);

export const aiAppRemoved = (appId: string): AiAppRemovedEvent =>
    new AiAppRemovedEvent(appId);

export const aiAppsLoaded = (aiApps: ILogListRegistration[]): AiAppsLoadedEvent =>
    new AiAppsLoadedEvent(aiApps);