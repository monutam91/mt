import { createSession, createSessionFailed, createSessionSuccess } from './game-session.actions';
import { initialState, reducer } from './game-session.reducer';

describe('GameSession Reducer', () => {
    beforeEach(() => {});

    describe('Given createSession action is dispatched', () => {
        it('Then the reducer should return the previous state', () => {
            const action = createSession({ name: 'Test Name' });

            const result = reducer(initialState, action);

            expect(result).toBe(initialState);
        });
    });

    describe('Given the createSessionSuccess action is dispatched', () => {
        it(`Then the reducer should return a new state
        And it should contain the player's name
        And it should contain the session token`, () => {
            const action = createSessionSuccess({ name: 'Test Name', token: 'FAKE-TOKEN' });

            const result = reducer(initialState, action);

            expect(result).not.toBe(initialState);
            expect(result.sessionToken).toBe('FAKE-TOKEN');
            expect(result.name).toBe('Test Name');
        });
    });

    describe('Given createSessionFailed action is dispatched', () => {
        it('Then the reducer should return the previous state', () => {
            const action = createSessionFailed({ reason: new Error('Mock Error') });

            const result = reducer(initialState, action);

            expect(result).toBe(initialState);
        });
    });

    describe('Given an unknown action is dispatched', () => {
        it('Then the reducer should return the previous state', () => {
            const action = {} as any;

            const result = reducer(initialState, action);

            expect(result).toBe(initialState);
        });
    });
});
