import { Action } from '@ngrx/store';
import { User } from '../models/user.model';

export const SET_USER = '[Auth] Set User';
export const UNSET_USER = '[Auth] Unset User'

export class setUserAction  implements Action{ 
    readonly type = SET_USER;
    constructor(public user: User) { }
}

export class unsetUserAction implements Action { 
    readonly type = UNSET_USER;
}

export type actions = setUserAction  | unsetUserAction;