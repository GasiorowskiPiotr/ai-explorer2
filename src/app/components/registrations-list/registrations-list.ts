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

    onRemoveRequested($event: string) {
        const appId: string = $event;

        this.removeAppRequested.next(appId);
    }

}