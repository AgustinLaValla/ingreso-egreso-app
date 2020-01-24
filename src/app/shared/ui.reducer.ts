import * as fromUI from './ui.actions';

//Estado del UI (interfaz de usuario)
export interface State { 
    isLoading: boolean;
}

const initialState: State = {isLoading : false};

export function UiReducer(state = initialState, action:fromUI.acciones): State {
    switch(action.type){
        case fromUI.ACTIVAR_LOADING: 
            return {
                isLoading: true
            } ;
        case fromUI.DESACTIVAR_LOADING:
            return{
                isLoading: false
            };

        default: return state;
    }
}