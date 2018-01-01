import { Component, Input } from '@angular/core';

@Component({
    selector: 'browser-timing',
    templateUrl: './browser-timing.html'
})
export class BrowserTimingComponent {
    @Input() public info: any
}