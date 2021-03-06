import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ILogListRegistration, IExceptionEntry } from '../../state';

@Component({
    selector: 'registrations-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './registrations-list.html'
})
export class RegistrationsListComponent {

    @Input() public items: {registration: ILogListRegistration, exceptions: IExceptionEntry}[] = [];

    @Output() public removeAppRequested: EventEmitter<string> = new EventEmitter();
    @Output() public exploreLogsRequested: EventEmitter<string> = new EventEmitter();
    @Output() public exploreExceptionsRequested: EventEmitter<string> = new EventEmitter();

    onRemoveRequested($event: string) {
        const appId: string = $event;

        this.removeAppRequested.next(appId);
    }

    onExploreRequested($event: string) {
        const appName: string = $event;

        this.exploreLogsRequested.next(appName);
    }

    onExploreExceptionsRequested($event: string) {
        const appId: string = $event;

        this.exploreExceptionsRequested.next(appId);
    }

}