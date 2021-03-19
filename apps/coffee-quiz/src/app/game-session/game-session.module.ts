import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameSessionRoutingModule } from './game-session-routing.module';
import { GameSessionComponent } from './game-session.component';


@NgModule({
  declarations: [GameSessionComponent],
  imports: [
    CommonModule,
    GameSessionRoutingModule
  ]
})
export class GameSessionModule { }
