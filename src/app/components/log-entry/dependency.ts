import { Component, Input } from '@angular/core';

@Component({
    selector: 'dependency',
    templateUrl: './dependency.html'
})
export class DependencyComponent {
    @Input() public info: any
}