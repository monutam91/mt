import { State, GAME_SESSION_FEATURE_KEY } from './game-session.reducer';
import { getSessionToken, hasSession } from './game-session.selectors';

export interface TestSchema {
    readonly [GAME_SESSION_FEATURE_KEY]: State;
}

describe('GameSession Selectors', () => {
    let initialState: TestSchema;

    beforeEach(() => {
        initialState = {
            [GAME_SESSION_FEATURE_KEY]: {
                sessionToken: null,
                name: null,
            },
        };
    });

    describe('getSessionToken', () => {
        it('should return the token stored in the State', () => {
            initialState[GAME_SESSION_FEATURE_KEY].sessionToken = 'FAKE-TOKEN';
            expect(getSessionToken.projector(initialState[GAME_SESSION_FEATURE_KEY])).toBe('FAKE-TOKEN');
        });
    });

    describe('hasSession', () => {
        it('should return true if there is a stored key in the State', () => {
            initialState[GAME_SESSION_FEATURE_KEY].sessionToken = 'FAKE-TOKEN';

            expect(hasSession.projector(initialState[GAME_SESSION_FEATURE_KEY].sessionToken)).toBe(true);
        });

        it('should return true if there is not a stored key in the State', () => {
            expect(hasSession.projector(initialState[GAME_SESSION_FEATURE_KEY].sessionToken)).toBe(false);
        });
    });
});
