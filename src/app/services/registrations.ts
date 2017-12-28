import { InjectionToken, Injectable } from '@angular/core';
import { setItem, removeItem, getItem } from 'localforage';

import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';

import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

import { ILogListRegistration } from '../state'
import { Promise, defer } from 'q';

const storageKey = '__APPS__'

export interface IRegistrationService {

    register(app: ILogListRegistration): Observable<ILogListRegistration>;
    remove(appId: string): Observable<{}>;
    getAll(): Observable<ILogListRegistration[]>;

}

@Injectable()
export class RegistrationService implements IRegistrationService {
    getAll = () =>
        fromPromise(getItem<ILogListRegistration[]>(storageKey).then(res => {
            return res || [];
        }));

    register = (app: ILogListRegistration): Observable<any> =>
        fromPromise(getItem(storageKey).then((items: ILogListRegistration[]) => {
            const entries = items || [];
            const newEntries = [...entries, app];

            return newEntries;
        }).then((newEntries: ILogListRegistration[]) => {
            return setItem(storageKey, newEntries);
        }));
    
    remove = (appId: string): Observable<{}> =>
        fromPromise(getItem(storageKey).then((items: ILogListRegistration[])=> {
            return items.filter((i) => i.appId !== appId)
        }).then((newEntries: ILogListRegistration[]) => {
            return setItem(storageKey, newEntries);
        }));

}

export const REGISTRATION_SERVICE = new InjectionToken<string>("REGISTRATION_SERVICE");