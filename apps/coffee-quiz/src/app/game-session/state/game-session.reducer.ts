import { createReducer, Action } from '@ngrx/store';

export const GAME_SESSION_FEATURE_KEY = 'gameSession';

export interface State {
    sessionToken: string;
}

export interface GameSessionPartialState {
    readonly [GAME_SESSION_FEATURE_KEY]: State;
}

export const initialState: State = {
    sessionToken: null,
};

const gameSessionReducer = createReducer(initialState);

export function reducer(state: State | undefined, action: Action) {
    return gameSessionReducer(state, action);
}
