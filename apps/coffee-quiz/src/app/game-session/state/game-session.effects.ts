import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, select, Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

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
            switchMap(([, session]) => {
                return this.session.resetSessionToken(session).pipe(
                    map(() => resetSessionSuccess()),
                    catchError((reason) => of(resetSessionFailed({ reason })))
                );
            })
        );
    });

    public navigateToMainGame$: Observable<Action> = createEffect(
        () => {
            return this.actions$.pipe(
                ofType(createSessionSuccess),
                tap(() => this.router.navigateByUrl('/game'))
            );
        },
        { dispatch: false }
    );

    constructor(
        private store: Store,
        private actions$: Actions,
        private router: Router,
        private session: SessionService
    ) {}
}
