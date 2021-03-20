import { initialState, reducer } from './game-session.reducer';

describe('GameSession Reducer', () => {
    beforeEach(() => {});

    describe('valid GameSession actions', () => {});

    describe('unknown action', () => {
        it('should return the previous state', () => {
            const action = {} as any;

            const result = reducer(initialState, action);

            expect(result).toBe(initialState);
        });
    });
});
