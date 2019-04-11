import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NxModule } from '@nrwl/nx';

import { AppComponent } from './app.component';
import { MtInfoItemModule } from './components/public_api';
import { ScrollWithBodyDirective } from './directives/public_api';

@NgModule({
    declarations: [AppComponent, ScrollWithBodyDirective],
    imports: [BrowserModule, NxModule.forRoot(), MtInfoItemModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
