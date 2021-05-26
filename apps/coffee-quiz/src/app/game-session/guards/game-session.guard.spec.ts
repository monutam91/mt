import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold } from '@nrwl/angular/testing';

import { hasSession } from '../state/game-session.selectors';

import { GameSessionGuard } from './game-session.guard';

describe('GameSessionGuard', () => {
    let guard: GameSessionGuard;
    let mockRouter: Router;
    let store: MockStore;
    let hasSessionMock: MemoizedSelector<any, boolean, DefaultProjectorFn<boolean>>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [provideMockStore()],
        });

        mockRouter = TestBed.inject(Router);
        jest.spyOn(mockRouter, 'navigateByUrl').mockReturnValue(Promise.resolve(true));
        store = TestBed.inject(MockStore);
        guard = TestBed.inject(GameSessionGuard);
        hasSessionMock = store.overrideSelector(hasSession, false);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    describe('Given the user has an active session', () => {
        beforeEach(() => {
            hasSessionMock.setResult(true);
        });

        it(`Then the guard disallow activation
            And the guard should navigate to the game`, () => {
            const expected = cold('(a|)', { a: false });
            expect(guard.canActivate()).toBeObservable(expected);
            expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/game');
        });
    });

    describe('Given the user does not have an active session', () => {
        beforeEach(() => {
            hasSessionMock.setResult(false);
        });

        it('Then the guard allow activation', () => {
            const expected = cold('(a|)', { a: true });
            expect(guard.canActivate()).toBeObservable(expected);
        });
    });
});
