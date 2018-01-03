import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { IApplicationState, IUIState } from './state';


import { loadAiApps } from './actions/registrations/commands';
import { loadExceptions } from './actions/exceptions/commands';
import { ViewChild } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ui: IUIState = { loading: false, errorMessage: '' };

  @ViewChild('loader') private spinner: MatProgressSpinner;

  constructor(private store: Store<IApplicationState>, private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {

    this.store.select(e => e.ui).subscribe(ui => {
      this.ui = ui;
      this.changeDetector.detectChanges();
    });

    this.store.select(e => e.registrations).subscribe(regs => {

      if(regs) {
        var toLoad = regs.filter(r => r.loadExceptions);
        
        if(toLoad && toLoad.length > 0)
          this.store.dispatch(loadExceptions(toLoad));
      }
    });

    this.store.dispatch(loadAiApps());
  }
}
