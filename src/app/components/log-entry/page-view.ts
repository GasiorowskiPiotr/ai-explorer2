import { Component, Input } from '@angular/core';

@Component({
    selector: 'page-view',
    templateUrl: './page-view.html',
    styleUrls: ['./log-entry.css']
})
export class PageViewComponent {
    @Input() public info: any
}