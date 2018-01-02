import { Component, OnInit, ViewChild, ViewContainerRef, OnDestroy, ComponentRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { IApplicationState, ILogEntry, EntryTypes, ICustomEvent, IDependency, IException, IPageView, IRequest, ITrace } from '../../state';

import { loadLogs } from '../../actions/lists/commands';
import { ComponentFactoryResolver, ComponentFactory } from '@angular/core';

import { CustomEventComponent } from './custom-event';
import { AvailabilityResultComponent } from './availability-result';
import { BrowserTimingComponent } from './browser-timing';
import { DependencyComponent } from './dependency';
import { ExceptionComponent } from './exception';
import { PageViewComponent } from './page-view';
import { RequestComponent } from './request';
import { TraceComponent } from './trace';


//import 'rxjs/add/operator/do';


@Component({
    selector: 'log-entry',
    templateUrl: './log-entry.html',
    styleUrls: ['./log-entry.css']
})
export class LogEntryComponent implements OnInit, OnDestroy {
        
    public logEntry: ILogEntry = { customDimensions: {}, id: '', operation: null, timestamp: new Date(), type: EntryTypes.TRACE };
    public customDimensions: { key: string, value: any }[] = [];
    private componentRef: ComponentRef<any>;

    @ViewChild("infoContainer", { read: ViewContainerRef }) public infoContainer: ViewContainerRef;

    constructor(
        private activatedRoute: ActivatedRoute, 
        private store: Store<IApplicationState>,
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }

    ngOnInit(): void {
        this.activatedRoute.params.subscribe(params => {
            const appName = params.name;
            const eventId = params.eventId;

            this.store
                .select(e => e.lists)
                .map(l => l.find(list => list.name === appName)) // .do --> load event to list!
                .filter(l => l != null && l.entries != null && l.entries.length > 0)
                .map(list => list.entries.find(entry => entry.id === eventId))
                .subscribe(entry => {
                    this.logEntry = entry;
                    this.createComponent(this.logEntry);
                    this.customDimensions = Object
                        .keys(this.logEntry.customDimensions)
                        .map(key => ({ key, value: this.logEntry.customDimensions[key] }));
                });

            window.scrollTo(0, 0); // HACK: Need to change that!
        });
    }

    createComponent(entry: ILogEntry) {
        this.infoContainer.clear();

        let factory: ComponentFactory<
            CustomEventComponent|
            AvailabilityResultComponent|
            BrowserTimingComponent|
            DependencyComponent|
            ExceptionComponent|
            PageViewComponent|
            RequestComponent|
            TraceComponent>;

        let inputData: any;
        
        switch(entry.type) {
            case EntryTypes.AVAILABILITY_RESULT: {
                factory = this.componentFactoryResolver.resolveComponentFactory(AvailabilityResultComponent);
                inputData = null;
                break;
            }
            case EntryTypes.BROWSER_TIMING: {
                factory = this.componentFactoryResolver.resolveComponentFactory(BrowserTimingComponent);
                inputData = null;
                break;
            }
            case EntryTypes.CUSTOM_EVENT: {
                factory = this.componentFactoryResolver.resolveComponentFactory(CustomEventComponent);
                inputData = (<ICustomEvent>entry).customEvent;
                break;
            }
            case EntryTypes.DEPENDENCY: {
                factory = this.componentFactoryResolver.resolveComponentFactory(DependencyComponent);
                inputData = (<IDependency>entry).dependency;
                break;
            }
            case EntryTypes.EXCEPTION: {
                factory = this.componentFactoryResolver.resolveComponentFactory(ExceptionComponent);
                inputData = (<IException>entry).exception;
                break;
            }
            case EntryTypes.PAGE_VIEW: {
                factory = this.componentFactoryResolver.resolveComponentFactory(PageViewComponent);
                inputData = (<IPageView>entry).pageView;
                break;
            }
            case EntryTypes.REQUEST: {
                factory = this.componentFactoryResolver.resolveComponentFactory(RequestComponent);
                inputData = (<IRequest>entry).request;
                break;
            }
            case EntryTypes.TRACE: {
                factory = this.componentFactoryResolver.resolveComponentFactory(TraceComponent);
                inputData = (<ITrace>entry).trace;
                break;
            }
        }

        this.componentRef = this.infoContainer.createComponent(factory);
        this.componentRef.instance.info = inputData;


    }

    ngOnDestroy(): void {
        if(this.componentRef) {
            this.componentRef.destroy();
        }
    }

}