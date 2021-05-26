import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'apps/coffee-quiz/src/environments/environment';
import { RequestSession } from '../models/index';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class SessionService {
    constructor(private httpClient: HttpClient) {}

    public requestSessionToken(): Observable<string> {
        const params = new HttpParams().append('command', 'request');
        return this.httpClient
            .get<RequestSession>(`${environment.serviceUrl}/api_token.php`, { params })
            .pipe(map((result) => result.token));
    }

    public resetSessionToken(token: string): Observable<void> {
        const params = new HttpParams().append('command', 'reset').append('token', token);
        return this.httpClient.get<void>(`${environment.serviceUrl}/api_token.php`, { params });
    }
}
