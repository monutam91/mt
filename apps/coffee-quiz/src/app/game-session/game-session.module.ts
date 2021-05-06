import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { GameSessionRoutingModule } from './game-session-routing.module';
import { GameSessionComponent } from './game-session.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromGameSession from './state/game-session.reducer';
import { GameSessionEffects } from './state/game-session.effects';
import { GameSessionFacade } from './state/game-session.facade';

@NgModule({
    declarations: [GameSessionComponent],
    imports: [
        CommonModule,
        GameSessionRoutingModule,
        StoreModule.forFeature(fromGameSession.GAME_SESSION_FEATURE_KEY, fromGameSession.reducer),
        EffectsModule.forFeature([GameSessionEffects]),
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatFormFieldModule,
    ],
    providers: [GameSessionFacade],
})
export class GameSessionModule {}
