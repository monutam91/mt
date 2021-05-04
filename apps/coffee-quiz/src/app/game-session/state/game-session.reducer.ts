import { createReducer, Action, on } from '@ngrx/store';
import { cloneDeep } from 'lodash';
import { createSessionSuccess } from './game-session.actions';

export const GAME_SESSION_FEATURE_KEY = 'gameSession';

export interface State {
    sessionToken: string;
    name: string;
}

export interface GameSessionPartialState {
    readonly [GAME_SESSION_FEATURE_KEY]: State;
}

export const initialState: State = {
    sessionToken: null,
    name: null,
};

const gameSessionReducer = createReducer(
    initialState,
    on(createSessionSuccess, (state, action) => {
        return {
            ...cloneDeep(state),
            sessionToken: action.token,
            name: action.name,
        };
    })
);

export function reducer(state: State | undefined, action: Action) {
    return gameSessionReducer(state, action);
}
