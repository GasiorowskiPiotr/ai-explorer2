import { Action } from '@ngrx/store';
import { ILogListRegistration, IExceptionEntry } from '../../../state';

export enum EVENT_TYPES {
    EXCEPTIONS_LOADED = 'EXCEPTIONS_LOADED'
}


export class ExceptionsLoadedEvent implements Action {
    type: string = EVENT_TYPES.EXCEPTIONS_LOADED;

    constructor(public exceptions: IExceptionEntry[]) { }
}

export const exceptionsLoaded = (exceptions: IExceptionEntry[]) : ExceptionsLoadedEvent => 
    new ExceptionsLoadedEvent(exceptions);
