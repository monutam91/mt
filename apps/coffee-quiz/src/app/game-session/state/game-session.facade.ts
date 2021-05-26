import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EmptyNameError } from '../models/create-session-errors.model';

import * as GameSessionActions from './game-session.actions';
import * as GameSessionSelectors from './game-session.selectors';

@Injectable()
export class GameSessionFacade {
    public get hasSession$(): Observable<boolean> {
        return this.store.pipe(select(GameSessionSelectors.hasSession));
    }

    constructor(private store: Store) {}

    public createSession(name: string) {
        if (!name || !name.trim()) {
            throw new EmptyNameError();
        }

        this.store.dispatch(GameSessionActions.createSession({ name }));
    }
}
