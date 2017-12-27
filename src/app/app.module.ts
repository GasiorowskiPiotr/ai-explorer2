import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

// -------- Services
import { REGISTRATION_SERVICE, RegistrationService } from './services/registrations';

// -------- Effects
import { EffectsModule } from '@ngrx/effects';
import { RegistrationsEffects } from './effects/registrations';

// -------- Store
import { StoreModule } from '@ngrx/store';
import { registrationsReducer } from './reducers/registrations';
import { exceptionsReducer } from './reducers/exceptions';

// -------- Material modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

const materialModules = [MatToolbarModule, MatButtonModule, MatCardModule, MatIconModule];

// -------- My components
import { RegistrationsComponent } from './components/registrations';
import { RegistrationsListComponent } from './components/registrations-list';
import { RegistrationItemComponent } from './components/registration-item';

const aiExplorerComponent = [RegistrationsComponent, RegistrationsListComponent, RegistrationItemComponent];

@NgModule({
  declarations: [
    AppComponent,
    [...aiExplorerComponent]
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    StoreModule.forRoot({
      registrations: registrationsReducer,
      exceptions: exceptionsReducer
    }),
    EffectsModule.forRoot([RegistrationsEffects]),
    [...materialModules],
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [{
    provide: REGISTRATION_SERVICE,
    useClass: RegistrationService
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
