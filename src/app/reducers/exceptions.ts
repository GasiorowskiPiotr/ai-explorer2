import { Action } from '@ngrx/store';
import { IExceptionEntry } from '../state';

import { EVENT_TYPES, ExceptionsLoadedEvent } from '../actions/exceptions/events';

export function exceptionsReducer(state: IExceptionEntry[] = [], action: Action) {

    switch(action.type) {
        case EVENT_TYPES.EXCEPTIONS_LOADED: {
            const evt: ExceptionsLoadedEvent = <ExceptionsLoadedEvent>action;

            return evt.exceptions;
        }
        default: {
            return state;
        }
    }

}