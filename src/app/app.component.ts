import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IApplicationState } from './state';


import { loadAiApps } from './actions/registrations/commands';
import { loadExceptions } from './actions/exceptions/commands';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private store: Store<IApplicationState>) {}

  ngOnInit(): void {

    this.store.select(e => e.registrations).subscribe(regs => {
      var toLoad = regs.filter(r => r.loadExceptions);

      this.store.dispatch(loadExceptions(toLoad));
    })

    this.store.dispatch(loadAiApps());
  }
}
