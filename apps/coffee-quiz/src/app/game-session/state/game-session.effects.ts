import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { SessionService } from '../services/session.service';
import { createSession, createSessionFailed, createSessionSuccess } from './game-session.actions';

@Injectable()
export class GameSessionEffects {
    public createSession$: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType(createSession),
            switchMap((action) => {
                return this.session.requestSessionToken().pipe(
                    map((token) => createSessionSuccess({ name: action.name, token })),
                    catchError((error) => of(createSessionFailed({ reason: error })))
                );
            })
        );
    });

    constructor(private actions$: Actions, private session: SessionService) {}
}
