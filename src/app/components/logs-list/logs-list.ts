import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ILogEntry, EntryTypes } from '../../state';

@Component({
    selector: 'logs-list',
    templateUrl: './logs-list.html'
})
export class LogsListComponent {

    @Input() public entries: ILogEntry[];

    @Output() public loadRequested: EventEmitter<boolean> = new EventEmitter();

    public entryId = (entry: ILogEntry) => entry.id;
}