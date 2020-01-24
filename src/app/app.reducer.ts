import { ActionReducerMap } from '@ngrx/store'
import * as fromUI from './shared/ui.reducer'
import * as fromAuth from './auth/auth.reducer';
import * as fromIE from './ingreso-egreso/ingreso-egreso.reducer';

//Definición del estado global de la aplicación
export interface AppState { 
    ui: fromUI.State,
    auth: fromAuth.AuthState,
    IE: fromIE.Ingreso_Egreso_State
}

export const appReducer: ActionReducerMap<AppState> = {// Permite fusionar varios reducers en uno solo
    ui: fromUI.UiReducer,
    auth: fromAuth.authReducer,
    IE: fromIE.IE_Reducer
}; 