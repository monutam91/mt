import { initialState, State, GAME_SESSION_FEATURE_KEY } from './game-session.reducer';
import { getSessionToken } from './game-session.selectors';

export interface TestSchema {
    readonly [GAME_SESSION_FEATURE_KEY]: State;
}

describe('GameSession Selectors', () => {
    const initialState: TestSchema = {
        [GAME_SESSION_FEATURE_KEY]: {
            sessionToken: 'FAKE-TOKEN',
        },
    };

    describe('getSessionToken', () => {
        it('should return the token stored in the State', () => {
            expect(getSessionToken.projector(initialState));
        });
    });
});
