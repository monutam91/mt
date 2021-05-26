import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { EMPTY, of } from 'rxjs';

import { GameSessionEffects } from './game-session.effects';
import { GameSessionFacade } from './game-session.facade';
import { GAME_SESSION_FEATURE_KEY, State, reducer } from './game-session.reducer';
import { SessionService } from '../services/session.service';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { EmptyNameError } from '../models/create-session-errors.model';
import { createSession } from './game-session.actions';

interface TestSchema {
    gameSession: State;
}

describe('GameSessionFacade', () => {
    const fakeToken = 'FAKE_TOKEN';
    let facade: GameSessionFacade;

    beforeEach(() => {});

    describe('Given it is used in NgModule', () => {
        let store: Store<TestSchema>;

        beforeEach(() => {
            @NgModule({
                imports: [
                    StoreModule.forFeature(GAME_SESSION_FEATURE_KEY, reducer),
                    EffectsModule.forFeature([GameSessionEffects]),
                ],
                providers: [
                    GameSessionFacade,
                    {
                        provide: SessionService,
                        useValue: {
                            requestSessionToken: jest.fn(() => of(fakeToken)),
                            resetSessionToken: jest.fn(() => EMPTY),
                        },
                    },
                ],
            })
            class CustomFeatureModule {}

            @NgModule({
                imports: [StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
            })
            class RootModule {}
            TestBed.configureTestingModule({ imports: [RootModule] });

            store = TestBed.inject(Store);
            facade = TestBed.inject(GameSessionFacade);
        });

        it('Then the facade should be created', () => {
            expect(facade).toBeTruthy();
        });
    });

    describe('Feature: createSession', () => {
        let store: MockStore;

        beforeEach(() => {
            TestBed.configureTestingModule({
                providers: [GameSessionFacade, provideMockStore()],
            });

            facade = TestBed.inject(GameSessionFacade);
            store = TestBed.inject(MockStore);

            store.dispatch = jest.fn();
        });

        describe('Given the facade is created', () => {
            it(`When the createSession is called with falsy name value
                Then EmptyNameError should be thrown`, () => {
                expect(() => {
                    facade.createSession(null);
                }).toThrowError(new EmptyNameError());
                expect(() => {
                    facade.createSession(undefined);
                }).toThrowError(new EmptyNameError());
                expect(() => {
                    facade.createSession('');
                }).toThrowError(new EmptyNameError());
            });

            it(`When the createSession is called with a name which only contains whitespaces
                Then EmptyNameError should be thrown`, () => {
                expect(() => {
                    facade.createSession('   ');
                }).toThrowError(new EmptyNameError());
            });

            it(`When createSession is called with 'Test Elek'
                Then createSession action should be dispatched with name 'Test Elek`, () => {
                facade.createSession('Test Elek');
                expect(store.dispatch).toHaveBeenCalledWith(createSession({ name: 'Test Elek' }));
            });
        });
    });
});
