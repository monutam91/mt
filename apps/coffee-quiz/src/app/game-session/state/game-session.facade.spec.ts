import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { EMPTY, of } from 'rxjs';

import { GameSessionEffects } from './game-session.effects';
import { GameSessionFacade } from './game-session.facade';
import { GAME_SESSION_FEATURE_KEY, State, reducer } from './game-session.reducer';
import { SessionService } from '../services/session.service';

interface TestSchema {
    gameSession: State;
}

describe('GameSessionFacade', () => {
    const fakeToken = 'FAKE_TOKEN';
    let facade: GameSessionFacade;
    let store: Store<TestSchema>;

    let mockSessionService: SessionService;

    beforeEach(() => {});

    describe('used in NgModule', () => {
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

        it('should be created', () => {
            expect(facade).toBeTruthy();
        });
    });
});
