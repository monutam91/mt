import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { hasSession } from '../state/game-session.selectors';

@Injectable({
    providedIn: 'root',
})
export class GameSessionGuard implements CanActivate {
    constructor(private _store: Store) {}

    canActivate(): Observable<boolean> {
        return this._store.pipe(
            select(hasSession),
            first(),
            map((hasSession) => !hasSession)
        );
    }
}
