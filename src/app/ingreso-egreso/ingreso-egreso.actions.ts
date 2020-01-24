import { Action } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export const SET_ITEMS = '[IE] Set Items';
export const UNSET_ITEMS = '[IE] Unset Items';

//Set values in items array
export class setItemsAction implements Action { 
    readonly type = SET_ITEMS;
    constructor(public items: IngresoEgreso[]) { }
}

//Unset items array to a null value
export class unsetItemsAction implements Action{
    readonly type = UNSET_ITEMS;
}

export type actions = setItemsAction | unsetItemsAction;