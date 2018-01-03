import { extend } from "webdriver-js-extender";

export interface IApplicationState {
    registrations: ILogListRegistration[];
    lists: ILogList[];
    exceptions: IExceptionEntry[];
    ui: IUIState;
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
    id: string;
    timestamp: Date;
    operation: { name: string };
    type: EntryTypes;
    customDimensions: any;
}

export interface ICustomEvent extends ILogEntry {
    customEvent: { name: string };
}

export interface IDependency extends ILogEntry {
    dependency: {
        target: string;
        data: string;
        success: string;
        duration: string;
        resultCode: string;
        type: string;
        name: string;
    };
}

export interface IException extends ILogEntry {
    exception: {
        problemId: string;
        type: string;
        outerMessage: string;
        innermostMessage: string;
        details: string;
    };
}

export interface IPageView extends ILogEntry {
    pageView: {
        name: string;
        url: string;
    };
}

export interface IRequest extends ILogEntry {
    request: {
        name: string;
        url: string;
        success: string;
        duration: string;
        resultCode: string;
    };
}

export interface ITrace extends ILogEntry {
    trace: {
        message: string;
        severityLevel: string;
    };
}

export interface IPager {
    top: number;
    skip: number;
}

export interface IFilter {
    query: string;
    types: FilterTypes[];
    time: FilterTimeSpans;
}

export enum FilterTypes {
    ALL = '$all',
    TRACES = 'traces',
    CUSTOM_EVENTS = 'customEvents',
    PAGE_VIEWS = 'pageViews',
    REQUESTS = 'requests',
    DEPENDENCIES = 'dependencies',
    EXCEPTIONS = 'exceptions'
}

export enum FilterTimeSpans {
    DAY = 'PT24H',
    HR8 = 'PT8H',
    HR1 = 'PT1H'
}

export enum EntryTypes {
    TRACE = 'trace',
    CUSTOM_EVENT = 'customEvent',
    PAGE_VIEW = 'pageView',
    BROWSER_TIMING = 'browserTiming',
    REQUEST = 'request',
    DEPENDENCY = 'dependency',
    EXCEPTION = 'exception',
    AVAILABILITY_RESULT = 'availabilityResult'
}

export interface IUIState {
    loading: boolean;
    errorMessage: string;
}