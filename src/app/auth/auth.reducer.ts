import { createReducer, on } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario.model';
import * as actions from './auth.actions';

export interface State {
    user: Usuario | null
}

export const initialState: State = {
    user:null
}   

export const _authReducer = createReducer(initialState,
    on(actions.setUser, (state, {user}) => ({...state, user: {...user}})),
    on(actions.unSetUser, (state) => ({...state, user: null}))
    // on(setUser, (state, user) => ({...state, user:{...user}})),

);

