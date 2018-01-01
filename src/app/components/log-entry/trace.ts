import { Component, Input } from '@angular/core';

@Component({
    selector: 'trace',
    templateUrl: './trace.html'
})
export class TraceComponent {
    @Input() public info: any
}