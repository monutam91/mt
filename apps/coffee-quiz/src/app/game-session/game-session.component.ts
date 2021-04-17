import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { hasSession } from './state/game-session.selectors';

@Component({
    selector: 'mt-game-session',
    templateUrl: './game-session.component.html',
    styleUrls: ['./game-session.component.scss'],
})
export class GameSessionComponent {
    public hasSession$: Observable<boolean>;

    constructor(private _store: Store) {
        this.hasSession$ = this._store.pipe(select(hasSession));
    }
}
