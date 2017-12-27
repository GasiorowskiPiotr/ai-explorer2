import { Action } from '@ngrx/store';
import { ILogListRegistration } from '../../../state/index';

export enum COMMAND_TYPES {
    LOAD_EXCEPTIONS = 'LOAD_EXCEPTIONS'
}

export class LoadExceptionsCommand implements Action {
    type: string = COMMAND_TYPES.LOAD_EXCEPTIONS

    constructor(public registrations: ILogListRegistration[]) { }
}


export const loadExceptions = (registrations: ILogListRegistration[]) : LoadExceptionsCommand => 
    new LoadExceptionsCommand(registrations);