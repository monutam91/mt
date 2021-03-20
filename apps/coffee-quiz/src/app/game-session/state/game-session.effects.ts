import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class GameSessionEffects {
    constructor(private actions$: Actions) {}
}
