import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { SessionService } from '../services/session.service';
import {
    createSession,
    createSessionFailed,
    createSessionSuccess,
    resetSession,
    resetSessionFailed,
    resetSessionSuccess,
} from './game-session.actions';
import { getSessionToken } from './game-session.selectors';

@Injectable()
export class GameSessionEffects {
    public createSession$: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType(createSession),
            switchMap((action) => {
                return this.session.requestSessionToken().pipe(
                    map((token) => createSessionSuccess({ name: action.name, token })),
                    catchError((reason) => of(createSessionFailed({ reason })))
                );
            })
        );
    });

    public resetSession$: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType(resetSession),
            withLatestFrom(this.store.pipe(select(getSessionToken))),
            switchMap(([action, session]) => {
                return this.session.resetSessionToken(session).pipe(
                    map(() => resetSessionSuccess()),
                    catchError((reason) => of(resetSessionFailed({ reason })))
                );
            })
        );
    });

    constructor(private store: Store, private actions$: Actions, private session: SessionService) {}
}
