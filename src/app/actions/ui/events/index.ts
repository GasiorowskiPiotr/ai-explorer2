import { Action } from '@ngrx/store';

export enum EVENT_TYPES {
    LOADING_STARTED = 'LOADING_STARTED',
    LOADING_SUCCEEDED = 'LOADING_FINISHED',
    LOADING_FAILED = 'LOADING_FAILED'
}

export class LoadingStartedEvent implements Action {
    type: string = EVENT_TYPES.LOADING_STARTED;
}

export class LoadingSucceededEvent implements Action {
    type: string = EVENT_TYPES.LOADING_SUCCEEDED;
}

export class LoadingFailedEvent implements Action {
    type: string = EVENT_TYPES.LOADING_FAILED
    
    constructor(public message: string) {}
}

export const loadingStarted = () => new LoadingStartedEvent();
export const loadingSucceeded = () => new LoadingSucceededEvent();
export const loadingFailed = (message: string) => new LoadingFailedEvent(message);
