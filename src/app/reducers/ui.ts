import { Action } from '@ngrx/store';
import { IUIState } from '../state';

import { LoadingFailedEvent, LoadingStartedEvent, LoadingSucceededEvent, EVENT_TYPES } from '../actions/ui/events';

export function uiReducer(state: IUIState = { loading: false, errorMessage: '' }, action: Action): IUIState {

    switch(action.type) {
        case EVENT_TYPES.LOADING_FAILED: {
            const evt: LoadingFailedEvent = <LoadingFailedEvent>action;
            return {...state, loading: false, errorMessage: evt.message };
        }
        case EVENT_TYPES.LOADING_STARTED: {
            
            return {...state, loading: true, errorMessage: ''};
        }
        case EVENT_TYPES.LOADING_SUCCEEDED: {
            
            return {...state, loading: false, errorMessage: ''};
        }
        default: {
            return state;
        }
    }
}