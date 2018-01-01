import { Component, Input } from '@angular/core';

@Component({
     selector: 'exception',
     templateUrl: './exception.html'
})
export class ExceptionComponent {
    @Input() public info: any
}