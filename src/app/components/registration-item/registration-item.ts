import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ILogListRegistration, IExceptionEntry } from '../../state';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'registration-item',
    templateUrl: './registration-item.html',
    styleUrls: ['./registration-item.css']
})
export class RegistrationItemComponent {

    @Input() public item: {registration: ILogListRegistration, exceptions: IExceptionEntry};

    @Output() public removeRequested: EventEmitter<string> = new EventEmitter();
    @Output() public exploreRequested: EventEmitter<string> = new EventEmitter();

    public remove() {
        this.removeRequested.next(this.item.registration.appId);
    }

    public explore() {
        this.exploreRequested.next(this.item.registration.name);
    }
}