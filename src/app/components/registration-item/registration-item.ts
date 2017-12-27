import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { ILogListRegistration, IExceptionEntry } from '../../state';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'registration-item',
    templateUrl: './registration-item.html',
    styleUrls: ['./registration-item.css']
})
export class RegistrationItemComponent {

    @Input() public item: {registration: ILogListRegistration, exceptions: IExceptionEntry};
}