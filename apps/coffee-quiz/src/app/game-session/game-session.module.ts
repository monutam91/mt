import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
    ],
    providers: [GameSessionFacade],
})
export class GameSessionModule {}
