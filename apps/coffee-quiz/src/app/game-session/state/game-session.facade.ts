import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as GameSessionActions from './game-session.actions';
import * as GameSessionFeature from './game-session.reducer';
import * as GameSessionSelectors from './game-session.selectors';

@Injectable()
export class GameSessionFacade {
    constructor(private store: Store) {}

    /**
     * Use the initialization action to perform one
     * or more tasks in your Effects.
     */
    init() {
        this.store.dispatch(GameSessionActions.init());
    }
}
