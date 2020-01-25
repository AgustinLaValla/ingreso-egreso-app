import { IngresoEgreso } from "src/app/models/ingreso-egreso.model";
import * as fromIE from './ingreso-egreso.actions';
import { AppState } from '../app.reducer'

export interface Ingreso_Egreso_State {
    items: IngresoEgreso[];
}

export interface App_State extends AppState { 
    IE: Ingreso_Egreso_State;
};

const initialState: Ingreso_Egreso_State = {
    items: []
};

export function IE_Reducer(state = initialState, action: fromIE.actions): Ingreso_Egreso_State {
    switch (action.type) {
        case fromIE.SET_ITEMS:
            return {
                items: [...action.items.map(item => {
                    return {...item};
                })]
            };
        case fromIE.UNSET_ITEMS:
            return {
                items: []
            };

        default: return state;
    }
        
}

 