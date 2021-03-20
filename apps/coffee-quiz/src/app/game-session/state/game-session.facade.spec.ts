import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';
import { GameSessionEffects } from './game-session.effects';
import { GameSessionFacade } from './game-session.facade';

import * as GameSessionSelectors from './game-session.selectors';
import * as GameSessionActions from './game-session.actions';
import { GAME_SESSION_FEATURE_KEY, State, initialState, reducer } from './game-session.reducer';

interface TestSchema {
    gameSession: State;
}

describe('GameSessionFacade', () => {
    let facade: GameSessionFacade;
    let store: Store<TestSchema>;

    beforeEach(() => {});

    describe('used in NgModule', () => {
        beforeEach(() => {
            @NgModule({
                imports: [
                    StoreModule.forFeature(GAME_SESSION_FEATURE_KEY, reducer),
                    EffectsModule.forFeature([GameSessionEffects]),
                ],
                providers: [GameSessionFacade],
            })
            class CustomFeatureModule {}

            @NgModule({
                imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
            })
            class RootModule {}
            TestBed.configureTestingModule({ imports: [RootModule] });

            store = TestBed.inject(Store);
            facade = TestBed.inject(GameSessionFacade);
        });
    });
});
