import { Action } from '@ngrx/store';
import { ILogList } from '../state'
import { EVENT_TYPES, LogsLoadedEvent } from '../actions/lists/events';

export function logsReducer(state: ILogList[] = [], action: Action): ILogList[] {

    switch(action.type) {
        case EVENT_TYPES.LOGS_LOADED: {
            const evt = <LogsLoadedEvent>action;

            const list = state.find(l => l.name === evt.app.name) || { entries: [], name: evt.app.name, filter: evt.filter, pager: evt.pager };

            let entries = [];
            if(evt.pager.skip === 0 ) {
                entries = [...evt.entries]
            } else {
                entries =  [...list.entries, ...evt.entries]
            }
            const newList = {...list, ...{ entries, pager: evt.pager, filter: evt.filter }};

            const currentIdx = state.findIndex(l => l.name === evt.app.name);

            return [...state.filter((__, idx) => idx < currentIdx), newList, ...state.filter((__, idx) => idx > currentIdx)];
        }
        default: {
            return state;
        }
    }

}