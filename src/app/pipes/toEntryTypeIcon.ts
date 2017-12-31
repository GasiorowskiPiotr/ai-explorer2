import { Pipe } from '@angular/core';
import { EntryTypes } from '../state';

@Pipe({
    name: "toEntryTypeIcon",
    pure: true
})
export class ToEntryTypeIconPipe {
    transform(value: EntryTypes) {
        switch(value) {
            case EntryTypes.TRACE: {
                return 'info_outline';
            }
            case EntryTypes.CUSTOM_EVENT: {
                return 'check_circle'
            }
            case EntryTypes.PAGE_VIEW: {
                return 'pageview';
            }
            case EntryTypes.BROWSER_TIMING: {
                return 'alarm';
            }
            case EntryTypes.REQUEST: {
                return 'import_export';
            }
            case EntryTypes.DEPENDENCY: {
                return 'group_work'
            }
            case EntryTypes.EXCEPTION: {
                return 'error';
            }
            case EntryTypes.AVAILABILITY_RESULT: {
                return 'setting_ethernet';
            }
            default: {
                return 'extension';
            }
        }
    }
}