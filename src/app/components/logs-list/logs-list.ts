import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { ILogEntry, EntryTypes } from '../../state';

@Component({
    selector: 'logs-list',
    templateUrl: './logs-list.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogsListComponent implements OnChanges {
    ngOnChanges(changes: SimpleChanges): void {
        console.log(changes);
    }

    @Input() public entries: ILogEntry[];

    @Output() public loadRequested: EventEmitter<boolean> = new EventEmitter();

    public entryId = (entry: ILogEntry) => entry.id;
}