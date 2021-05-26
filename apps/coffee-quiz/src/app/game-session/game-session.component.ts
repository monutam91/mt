import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { GameSessionFacade } from './state/game-session.facade';

@Component({
    selector: 'mt-game-session',
    templateUrl: './game-session.component.html',
    styleUrls: ['./game-session.component.scss'],
})
export class GameSessionComponent {
    public hasSession$: Observable<boolean>;
    public playerForm: FormGroup;

    constructor(private gameSessionFacade: GameSessionFacade) {
        this.hasSession$ = gameSessionFacade.hasSession$;

        this.playerForm = new FormGroup({
            playerName: new FormControl('', [Validators.required]),
        });
    }

    public submitPlayerForm() {
        if (this.playerForm.valid) {
            this.gameSessionFacade.createSession(this.playerForm.value.playerName);
        }
    }
}
