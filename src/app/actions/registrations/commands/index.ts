import { Action } from '@ngrx/store';

export enum COMMAND_TYPES {
    REGISTER_AI_APP = 'REGISTER_AI_APP',
    REMOVE_AI_APP = 'REMOVE_AI_APP',
    LOAD_AI_APPS = 'LOAD_AI_APPS'
}

export class RegisterAiAppCommand implements Action {
    type: string = COMMAND_TYPES.REGISTER_AI_APP;

    constructor(public name: string, public appId: string, public appKey: string, public loadExceptions: boolean) { }
}

export class RemoveAiAppCommand implements Action {
    type: string = COMMAND_TYPES.REMOVE_AI_APP;

    constructor(public appId: string) { }

}

export class LoadAiAppsCommand implements Action {
    type: string = COMMAND_TYPES.LOAD_AI_APPS;

    constructor() {}
}

export const registerAiApp = (name: string, appId: string, appKey: string, loadExceptions: boolean) : RegisterAiAppCommand => 
    new RegisterAiAppCommand(name, appId, appKey, loadExceptions);

export const removeAiApp = (appId: string): RemoveAiAppCommand =>
    new RemoveAiAppCommand(appId);

export const loadAiApps = (): LoadAiAppsCommand =>
    new LoadAiAppsCommand();
    