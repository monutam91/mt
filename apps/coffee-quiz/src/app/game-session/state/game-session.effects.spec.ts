import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot } from '@nrwl/angular/testing';

import { of, throwError } from 'rxjs';

import { SessionService } from '../services/session.service';
import { createSession, createSessionFailed, createSessionSuccess } from './game-session.actions';

import { GameSessionEffects } from './game-session.effects';

describe('GameSessionEffects', () => {
    const fakeToken = 'FAKE_TOKEN';
    let actions;
    let effects: GameSessionEffects;
    let mockSessionService: SessionService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                GameSessionEffects,
                provideMockActions(() => actions),
                {
                    provide: SessionService,
                    useValue: {
                        requestSessionToken: jest.fn(() => of(fakeToken)),
                    },
                },
            ],
        });

        effects = TestBed.inject(GameSessionEffects);
        mockSessionService = TestBed.inject(SessionService);
    });

    it('should create', () => {
        expect(effects).toBeTruthy();
    });

    describe('Given a createSession action dispatched', () => {
        describe('When the requestSession succeeds', () => {
            beforeEach(() => {
                mockSessionService.requestSessionToken = jest.fn(() => of(fakeToken));
            });

            it('Then the requestSession method should be called And createSessionSuccess should be dispatched', () => {
                actions = hot('-a', { a: createSession({ name: 'Test Name' }) });

                const expected = hot('-a', { a: createSessionSuccess({ name: 'Test Name', token: fakeToken }) });

                expect(effects.createSession$).toBeObservable(expected);
                expect(mockSessionService.requestSessionToken).toHaveBeenCalled();
            });
        });

        describe('When the requestSession failes', () => {
            beforeEach(() => {
                mockSessionService.requestSessionToken = jest.fn(() => throwError(new Error('Fake Error')));
            });

            it('Then the createSessionFailed should be dispatched', () => {
                actions = hot('-a', { a: createSession({ name: 'Test Name' }) });

                const expected = hot('-a', { a: createSessionFailed({ reason: new Error('Fake Error') }) });

                expect(effects.createSession$).toBeObservable(expected);
                expect(mockSessionService.requestSessionToken).toHaveBeenCalled();
            });
        });
    });
});
