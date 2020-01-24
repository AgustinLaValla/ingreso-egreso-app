import * as fromAuth from './auth.actions';  //Import all actions
import { User } from '../models/user.model';

//Create authentication state interface
export interface AuthState {
    user: User
}

//Define initial state
const initialState: AuthState = { 
    user: null
};

//Reducer
export function authReducer(state = initialState, action: fromAuth.actions): AuthState {
    switch(action.type) {
        case fromAuth.SET_USER: 
           return {
               user: {...action.user}
           }
        case fromAuth.UNSET_USER:
            return { 
                user: null
            }

        default: return state;
    }
}