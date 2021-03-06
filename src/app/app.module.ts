import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

// -------- Services
import { REGISTRATION_SERVICE, RegistrationService } from './services/registrations';
import { APPLICATION_INSIGHTS_SERVICE, ApplicationInsightsService } from './services/applicationInsigts';

// -------- Effects
import { EffectsModule } from '@ngrx/effects';
import { RegistrationsEffects } from './effects/registrations';
import { LogsEffects } from './effects/logs';
import { ExceptionsEffects } from './effects/exceptions';

// -------- Store
import { StoreModule } from '@ngrx/store';
import { registrationsReducer } from './reducers/registrations';
import { exceptionsReducer } from './reducers/exceptions';
import { logsReducer } from './reducers/logs';
import { uiReducer } from './reducers/ui';

// -------- Material modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const materialModules = [MatToolbarModule, MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatSlideToggleModule, MatListModule, MatProgressSpinnerModule];

// -------- My components
import { RegistrationsComponent } from './components/registrations';
import { RegistrationsListComponent } from './components/registrations-list';
import { RegistrationItemComponent } from './components/registration-item';
import { AiRegistrationComponent } from './components/ai-registration';
import { RegistrationFormComponent } from './components/registration-form';
import { LogsComponent } from './components/logs';
import { LogsListComponent } from './components/logs-list';
import { LogEntryComponent } from './components/log-entry';

const aiExplorerComponent = [RegistrationsComponent, RegistrationsListComponent, RegistrationItemComponent, AiRegistrationComponent, RegistrationFormComponent, LogsComponent, LogsListComponent, LogEntryComponent];

// -------- State
import { ILogListRegistration, IExceptionEntry, ILogList, IUIState } from './state';

// -------- Pipes
import { ToEntryTypeIconPipe } from './pipes/toEntryTypeIcon';
import { ToTitlePipe } from './pipes/toTitle';
import { ToEntryDescriptionPipe } from './pipes/toEntryDescription';

const pipes = [ToEntryTypeIconPipe, ToTitlePipe, ToEntryDescriptionPipe];

// -------- Dynamic components
import { AvailabilityResultComponent, BrowserTimingComponent, CustomEventComponent, DependencyComponent, ExceptionComponent, PageViewComponent, RequestComponent, TraceComponent } from './components/log-entry';
const dynamicComponents = [AvailabilityResultComponent, BrowserTimingComponent, CustomEventComponent, DependencyComponent, ExceptionComponent, PageViewComponent, RequestComponent, TraceComponent];

@NgModule({
  declarations: [
    AppComponent,
    [...aiExplorerComponent],
    [...dynamicComponents],
    [...pipes]
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({
      registrations: registrationsReducer,
      exceptions: exceptionsReducer,
      lists: logsReducer,
      ui: uiReducer
    }, {
      initialState: {
        exceptions: new Array<IExceptionEntry>(),
        registrations: new Array<ILogListRegistration>(),
        lists: new Array<ILogList>(),
        ui: <IUIState>{ loading: false, errorMessage: '' }
      }
    }),
    EffectsModule.forRoot([RegistrationsEffects, LogsEffects, ExceptionsEffects]),
    [...materialModules]/*,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })*/
  ],
  providers: [{
    provide: REGISTRATION_SERVICE,
    useClass: RegistrationService
  }, {
    provide: APPLICATION_INSIGHTS_SERVICE,
    useClass: ApplicationInsightsService
  }],
  entryComponents: [
    ...dynamicComponents
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
