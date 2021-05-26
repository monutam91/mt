import { fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SessionService } from './session.service';
import { environment } from '../../../environments/environment';

describe('SessionService', () => {
    let service: SessionService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        });
        service = TestBed.inject(SessionService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('Given the dev requests for a new token', () => {
        it('Then the service should call the request command', () => {
            const fakeToken = 'FAKE_TOKEN';

            service.requestSessionToken().subscribe((token) => {
                expect(token).toBe(fakeToken);
            });

            const req = httpMock.expectOne(`${environment.serviceUrl}/api_token.php?command=request`);

            expect(req.request.params.get('token')).toBeFalsy();

            req.flush({ response_code: 0, response_message: 'Fake message', token: fakeToken });
        });
    });

    describe('Given the dev requests resetting an existing token', () => {
        it('Then the service should call the reset command with the given token', () => {
            const fakeToken = 'FAKE_TOKEN';

            service.resetSessionToken(fakeToken).subscribe();

            httpMock.expectOne(`${environment.serviceUrl}/api_token.php?command=reset&token=${fakeToken}`);
        });
    });
});
