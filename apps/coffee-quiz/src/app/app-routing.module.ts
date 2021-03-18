import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';

export const routes: Route[] = [];

@NgModule({
    imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
