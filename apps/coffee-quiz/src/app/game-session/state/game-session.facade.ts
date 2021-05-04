import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as GameSessionActions from './game-session.actions';
import * as GameSessionFeature from './game-session.reducer';
import * as GameSessionSelectors from './game-session.selectors';

@Injectable()
export class GameSessionFacade {
    public get hasSession$(): Observable<boolean> {
        return this.store.pipe(select(GameSessionSelectors.hasSession));
    }

    constructor(private store: Store) {}
}
