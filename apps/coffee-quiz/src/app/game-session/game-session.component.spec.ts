import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of, Subject } from 'rxjs';

import { GameSessionComponent } from './game-session.component';
import { GameSessionFacade } from './state/game-session.facade';
import { hasSession } from './state/game-session.selectors';

describe('GameSessionComponent', () => {
    let component: GameSessionComponent;
    let fixture: ComponentFixture<GameSessionComponent>;
    let mockFacade: GameSessionFacade;
    let mockHasSession$: Subject<boolean>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GameSessionComponent],
            providers: [
                {
                    provide: GameSessionFacade,
                    useValue: {
                        get hasSession$() {
                            return mockHasSession$;
                        },
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        mockHasSession$ = new Subject();
        fixture = TestBed.createComponent(GameSessionComponent);
        mockFacade = TestBed.inject(GameSessionFacade);

        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Given the user has an active session already', () => {
        beforeEach(() => {
            mockHasSession$.next(true);
            fixture.detectChanges();
        });

        it('Then the Player name input should not exist', () => {
            expect(fixture.debugElement.query(By.css('[name=player-name]'))).toBeFalsy();
        });
    });

    describe('Given the user does not have an active session', () => {
        beforeEach(() => {
            mockHasSession$.next(false);
            fixture.detectChanges();
        });

        it('Then the Player name input should exist', () => {
            expect(fixture.debugElement.query(By.css('[name=player-name]'))).toBeTruthy();
        });
    });
});
