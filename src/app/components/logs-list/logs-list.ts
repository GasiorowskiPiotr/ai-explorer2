import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ILogEntry, EntryTypes } from '../../state';

@Component({
    selector: 'logs-list',
    templateUrl: './logs-list.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogsListComponent {
    
    @Input() public entries: ILogEntry[];
    
    @Output() public selected: EventEmitter<string> = new EventEmitter(); 

    public entryId = (entry: ILogEntry) => entry.id;

    public listItemSelected(entryId: string) {
        this.selected.next(entryId);
    }
}