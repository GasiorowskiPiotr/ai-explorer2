import { Component, Input } from '@angular/core';

@Component({
    selector: 'availability-result',
    templateUrl: './availability-result.html'
})
export class AvailabilityResultComponent {
    @Input() public info: any
}