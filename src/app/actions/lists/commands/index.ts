import { Action } from '@ngrx/store';
import { ILogListRegistration, IPager, IFilter, FilterTimeSpans, FilterTypes } from '../../../state'

export enum COMMAND_TYPES {
    LOAD_LOGS = 'LOAD_LOGS'
}

export class LoadLogsCommand implements Action {
    type: string = COMMAND_TYPES.LOAD_LOGS;

    public constructor(public app: ILogListRegistration, public pager: IPager, public filter: IFilter) { }
}

export const loadLogs = (
    app: ILogListRegistration, 
    pager: IPager = { skip: 0, top: 100 }, 
    filter: IFilter = { query: '', time: FilterTimeSpans.DAY, types: [FilterTypes.ALL]  }) => 
        new LoadLogsCommand(app, pager, filter);