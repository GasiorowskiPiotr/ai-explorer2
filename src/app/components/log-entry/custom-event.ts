import { Component, Input } from "@angular/core";
import { ICustomEvent } from "../../state/index";

@Component({
    selector: 'custom-event',
    templateUrl: './custom-event.html',
    styleUrls: ['./log-entry.css']
})
export class CustomEventComponent {

    @Input() public info: any;

}