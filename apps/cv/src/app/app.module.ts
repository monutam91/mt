import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { InfosModule, MtLabelValueModule } from './components/public_api';
import { ScrollWithBodyDirective } from './directives/public_api';

export function translateLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
    declarations: [AppComponent, ScrollWithBodyDirective],
    imports: [
        BrowserModule,
        HttpClientModule,
        InfosModule,
        MtLabelValueModule,
        TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useFactory: translateLoaderFactory, deps: [HttpClient] }
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
