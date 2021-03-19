import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameSessionComponent } from './game-session.component';

const routes: Routes = [{ path: '', component: GameSessionComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class GameSessionRoutingModule {}
