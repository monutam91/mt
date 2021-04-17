import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { GameSessionComponent } from './game-session.component';
import { hasSession } from './state/game-session.selectors';

describe('GameSessionComponent', () => {
    let component: GameSessionComponent;
    let fixture: ComponentFixture<GameSessionComponent>;
    let store: MockStore;
    let mockHasSessionSelector: MemoizedSelector<any, boolean, DefaultProjectorFn<boolean>>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GameSessionComponent],
            providers: [provideMockStore()],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GameSessionComponent);
        store = TestBed.inject(MockStore);
        mockHasSessionSelector = store.overrideSelector(hasSession, false);

        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Given the user has an active session already', () => {
        beforeEach(() => {
            mockHasSessionSelector.setResult(true);
            store.refreshState();
            fixture.detectChanges();
        });

        it('Then the Player name input should not exist', () => {
            expect(fixture.debugElement.query(By.css('[name=player-name]'))).toBeFalsy();
        });
    });

    describe('Given the user does not have an active session', () => {
        beforeEach(() => {
            mockHasSessionSelector.setResult(false);
            store.refreshState();
            fixture.detectChanges();
        });

        it('Then the Player name input should exist', () => {
            expect(fixture.debugElement.query(By.css('[name=player-name]'))).toBeTruthy();
        });
    });
});
