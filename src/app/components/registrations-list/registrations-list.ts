import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ILogListRegistration, IExceptionEntry } from '../../state';

@Component({
    selector: 'registrations-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './registrations-list.html'
})
export class RegistrationsListComponent {

    @Input() public items: {registration: ILogListRegistration, exceptions: IExceptionEntry}[] = [];

}