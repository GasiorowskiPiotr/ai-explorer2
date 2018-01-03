import { Injectable, InjectionToken } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILogEntry, ILogListRegistration, IExceptionEntry, IFilter, IPager } from '../state';
import { Observable } from 'rxjs/Observable';

export const APPLICATION_INSIGHTS_SERVICE = new InjectionToken('APPLICATION_INSIGHTS_SERVICE');

export interface IApplicationInsightsService {

    load( app: ILogListRegistration, filter: IFilter, paging: IPager): Observable<ILogEntry[]>;

    getExceptionCounts( apps: ILogListRegistration[] ): Observable<IExceptionEntry[]>;
}

@Injectable()
export class ApplicationInsightsService implements IApplicationInsightsService {
        
    constructor(private http: HttpClient) { }
    
    load(app: ILogListRegistration, filter: IFilter, paging: IPager): Observable<ILogEntry[]> {
        
        return Observable.create((observer) => {

            const urls = filter.types.map(t => `https://api.applicationinsights.io/v1/apps/${app.appId}/events/${t}?timespan=${filter.time}&$top=${paging.top}&$skip=${paging.skip}`);

            let results = new Array<ILogEntry>();

            let headers = new HttpHeaders({
                'x-api-key': app.appKey
            });

            let pushCnt = 0;
            urls.forEach(url => {

                this.http.get<{value: ILogEntry[]}>(url, { headers }).subscribe(response => {
                    results.push(...response.value);
                    pushCnt++;

                    results = results.sort((a,b) => b.timestamp > a.timestamp ? 1 : -1 );
                    if(pushCnt ===  urls.length) {
                        observer.next(results);
                    }
                });
            });
        });
    }

    getExceptionCounts(apps: ILogListRegistration[]): Observable<IExceptionEntry[]> {

        return Observable.create((observer) => {

            let results = new Array<IExceptionEntry>();

            const urls = apps.forEach((app) => {
                const url = `https://api.applicationinsights.io/v1/apps/${app.appId}/events/exceptions?timespan=PT24H&$select=id&$count=true`;
                const headers = new HttpHeaders({
                    'x-api-key': app.appKey
                });
    
                this.http.get(url, { headers }).subscribe(response => {

                    var exceptionEntry: IExceptionEntry = {
                        appId: app.appId,
                        exceptionsCount: response['@odata.count']
                    };

                    results.push(exceptionEntry)

                    if(results.length === apps.length) {
                        observer.next(results);
                    }
                });
            })
        });

    }
    
}