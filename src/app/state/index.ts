export interface IApplicationState {
    registrations: ILogListRegistration[];
    lists: ILogList[];
    exceptions: IExceptionEntry[];
}

export interface ILogListRegistration {
    name: string;
    appId: string;
    appKey: string;

    loadExceptions: boolean;
}

export interface ILogList {
    name: string;
    entries: ILogEntry[];

    pager: IPager;
    filter: IFilter;
}

export interface IExceptionEntry {
    appId: string;
    exceptionsCount: number;
}

export interface ILogEntry {

}

export interface IPager {
    top: number;
    skip: number;
}

export interface IFilter {
    query: string;
    type: FilterTypes;
    time: FilterTimeSpans;
}

export enum FilterTypes {
    ALL = '$all'
}

export enum FilterTimeSpans {
    DAY = 'PT24H'
}