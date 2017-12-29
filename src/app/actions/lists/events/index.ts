import { Action } from '@ngrx/store';
import { ILogListRegistration, IPager, IFilter, FilterTimeSpans, FilterTypes, ILogEntry } from '../../../state'

export enum EVENT_TYPES {
    LOGS_LOADED = 'LOGS_LOADED'
}

export class LogsLoadedEvent implements Action {
    type: string = EVENT_TYPES.LOGS_LOADED;

    public constructor(public entries: ILogEntry[], public app: ILogListRegistration, public pager: IPager, public filter: IFilter) { }
}

export const logsLoaded = (
    entries: ILogEntry[],
    app: ILogListRegistration, 
    pager: IPager, 
    filter: IFilter) => 
        new LogsLoadedEvent(entries, app, pager, filter);