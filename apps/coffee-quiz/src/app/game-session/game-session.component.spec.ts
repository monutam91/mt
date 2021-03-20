import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { GameSessionComponent } from './game-session.component';
import * as fromGameSession from './state/game-session.reducer';
import { getSessionToken } from './state/game-session.selectors';

interface TestSchema {
    readonly [fromGameSession.GAME_SESSION_FEATURE_KEY]: fromGameSession.State;
}

fdescribe('GameSessionComponent', () => {
    let component: GameSessionComponent;
    let fixture: ComponentFixture<GameSessionComponent>;
    let store: MockStore;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [GameSessionComponent],
            providers: [provideMockStore()],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(GameSessionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        store = TestBed.inject(MockStore);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show the input for Player name, when there is no session token', () => {
        store.overrideSelector(getSessionToken, null);
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('[name=player-name]'))).toBeTruthy();
    });

    it('should not show the player name input if we already have a session', () => {
        store.overrideSelector(getSessionToken, 'FAKE-TOKEN');
        fixture.detectChanges();

        expect(fixture.debugElement.query(By.css('[name=player-name]'))).toBeFalsy();
    });
});
