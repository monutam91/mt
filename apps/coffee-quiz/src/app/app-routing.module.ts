import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

import { GameSessionGuard } from './game-session';

export const routes: Route[] = [
    {
        path: 'create-game',
        loadChildren: () => import('./game-session/game-session.module').then((m) => m.GameSessionModule),
        canActivate: [GameSessionGuard],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled', relativeLinkResolution: 'legacy' })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
