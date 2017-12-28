import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IApplicationState, ILogListRegistration } from '../../state';
import { registerAiApp } from '../../actions/registrations/commands';
import { Router } from '@angular/router';

@Component({
    selector: 'ai-registration',
    templateUrl: './ai-registration.html'   
})
export class AiRegistrationComponent {

    constructor(private store: Store<IApplicationState>, private router: Router) { }

    onRegistrationRequested($event: ILogListRegistration) {
        const command = registerAiApp(
            $event.name,
            $event.appId,
            $event.appKey,
            $event.loadExceptions
        );

        this.store.dispatch(command);

        this.router.navigateByUrl('');
    }

}