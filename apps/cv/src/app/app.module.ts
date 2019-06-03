import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NxModule } from '@nrwl/angular';

import { AppComponent } from './app.component';
import { InfosModule, MtLabelValueModule } from './components/public_api';
import { ScrollWithBodyDirective } from './directives/public_api';

@NgModule({
    declarations: [AppComponent, ScrollWithBodyDirective],
    imports: [BrowserModule, NxModule.forRoot(), InfosModule, MtLabelValueModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
