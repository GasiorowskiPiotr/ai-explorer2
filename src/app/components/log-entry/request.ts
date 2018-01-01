import { Component, Input } from '@angular/core';

@Component({
    selector: 'request',
    templateUrl: './request.html'
})
export class RequestComponent {
    @Input() public info: any
}