import { createFeatureSelector, createSelector } from '@ngrx/store';

import { GAME_SESSION_FEATURE_KEY, State, GameSessionPartialState } from './game-session.reducer';

// Lookup the 'GameSession' feature state managed by NgRx
export const getGameSessionState = createFeatureSelector<GameSessionPartialState, State>(GAME_SESSION_FEATURE_KEY);

export const getSessionToken = createSelector(getGameSessionState, (state: State) => state.sessionToken);

export const hasSession = createSelector(getSessionToken, (token) => {
    return !!token;
});
