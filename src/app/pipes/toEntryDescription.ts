import { Pipe } from '@angular/core';
import { ILogEntry, EntryTypes, ITrace, ICustomEvent, IPageView, IRequest, IDependency, IExceptionEntry, IException } from '../state';

@Pipe({
    name: "toEntryDescription",
    pure: true
})
export class ToEntryDescriptionPipe {
    transform(value: ILogEntry) {
        if(!value) {
            return '';
        }
        switch(value.type) {
            case EntryTypes.TRACE: {
                return (<ITrace>value).trace.message;
            }
            case EntryTypes.CUSTOM_EVENT: {
                return (<ICustomEvent>value).customEvent.name;
            }
            case EntryTypes.PAGE_VIEW: {
                const log = <IPageView>value;
                return `${log.pageView.name} ${log.pageView.url || ''}`;
            }
            case EntryTypes.BROWSER_TIMING: {
                return '';
            }
            case EntryTypes.REQUEST: {
                const log = <IRequest>value;
                return `${log.request.name} ${log.request.resultCode} ${log.request.duration}s`;
            }
            case EntryTypes.DEPENDENCY: {
                const log = <IDependency>value;
                return log.dependency.target;
            }
            case EntryTypes.EXCEPTION: {
                const log = <IException>value;
                return log.exception.outerMessage;
            }
            case EntryTypes.AVAILABILITY_RESULT: {
                return '';
            }
            default: {
                return '';
            }
        }
    }
}