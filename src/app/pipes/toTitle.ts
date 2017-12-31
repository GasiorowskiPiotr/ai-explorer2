import { Pipe } from '@angular/core';
import { EntryTypes } from '../state';

@Pipe({
    name: "toTitle",
    pure: true
})
export class ToTitlePipe {
    transform(value: EntryTypes) {
        switch(value) {
            case EntryTypes.TRACE: {
                return 'Trace';
            }
            case EntryTypes.CUSTOM_EVENT: {
                return 'Custom Event'
            }
            case EntryTypes.PAGE_VIEW: {
                return 'Page View';
            }
            case EntryTypes.BROWSER_TIMING: {
                return 'Browser Timing';
            }
            case EntryTypes.REQUEST: {
                return 'Request';
            }
            case EntryTypes.DEPENDENCY: {
                return 'Dependency'
            }
            case EntryTypes.EXCEPTION: {
                return 'Exception';
            }
            case EntryTypes.AVAILABILITY_RESULT: {
                return 'Availability Result';
            }
            default: {
                return value;
            }
        }
    }
}