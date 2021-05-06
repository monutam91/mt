import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { MockModule } from 'ng-mocks';

import { GameSessionComponent } from './game-session.component';
import { GameSessionFacade } from './state/game-session.facade';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

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
            imports: [
                MockModule(MatButtonModule),
                MockModule(MatCardModule),
                MockModule(MatInputModule),
                MockModule(MatFormFieldModule),
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
