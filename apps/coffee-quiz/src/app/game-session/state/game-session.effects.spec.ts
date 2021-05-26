import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { hot } from '@nrwl/angular/testing';
import { MockComponent } from 'ng-mocks';

import { of, throwError } from 'rxjs';
import { GameComponent } from '../../game/game.component';

import { SessionService } from '../services/session.service';
import {
    createSession,
    createSessionFailed,
    createSessionSuccess,
    resetSession,
    resetSessionFailed,
    resetSessionSuccess,
} from './game-session.actions';

import { GameSessionEffects } from './game-session.effects';
import { getSessionToken } from './game-session.selectors';

describe('GameSessionEffects', () => {
    const fakeToken = 'FAKE_TOKEN';
    let actions;
    let store: MockStore;
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
                provideMockStore(),
            ],
            imports: [RouterTestingModule.withRoutes([{ path: 'game', component: MockComponent(GameComponent) }])],
        });

        store = TestBed.inject(MockStore);
        effects = TestBed.inject(GameSessionEffects);
        mockSessionService = TestBed.inject(SessionService);

        store.overrideSelector(getSessionToken, fakeToken);
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

    describe('Given a resetSession action dispatched', () => {
        describe('When the reset succeeds', () => {
            beforeEach(() => {
                mockSessionService.resetSessionToken = jest.fn(() => of(null));
            });

            it(`Then a resetSessionSuccess action should be dispatched`, () => {
                actions = hot('-a', { a: resetSession() });

                const expected = hot('-a', { a: resetSessionSuccess() });

                expect(effects.resetSession$).toBeObservable(expected);
                expect(mockSessionService.resetSessionToken).toHaveBeenCalledWith(fakeToken);
            });
        });

        describe('When the reset failes', () => {
            const mockError = new Error('Mock Error');
            beforeEach(() => {
                mockSessionService.resetSessionToken = jest.fn(() => throwError(mockError));
            });

            it(`Then a resetSessionFailed action should be dispatched`, () => {
                actions = hot('-a', { a: resetSession() });

                const expected = hot('-a', { a: resetSessionFailed({ reason: mockError }) });

                expect(effects.resetSession$).toBeObservable(expected);
                expect(mockSessionService.resetSessionToken).toHaveBeenCalledWith(fakeToken);
            });
        });
    });

    describe('Given a createSessionSuccess action dispatched', () => {
        it('Then the effect should navigate to the main game', () => {
            const router = TestBed.inject(Router);
            router.navigateByUrl = jest.fn(() => Promise.resolve(true));
            actions = hot('-a', { a: createSessionSuccess({ name: 'Test Elek', token: fakeToken }) });

            const expected = hot('-a', { a: createSessionSuccess({ name: 'Test Elek', token: fakeToken }) });
            expect(effects.navigateToMainGame$).toBeObservable(expected);
            expect(router.navigateByUrl).toBeCalledWith('/game');
        });
    });
});
