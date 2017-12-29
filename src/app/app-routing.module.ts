import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationsComponent } from './components/registrations';
import { AiRegistrationComponent } from './components/ai-registration';
import { LogsComponent } from './components/logs';

const routes: Routes = [{
  path: '', component: RegistrationsComponent, pathMatch: 'full'
}, {
  path: 'register', component: AiRegistrationComponent
}, {
  path: 'logs/:name', component: LogsComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
