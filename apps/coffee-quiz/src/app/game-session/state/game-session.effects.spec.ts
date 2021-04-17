import { TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/angular';

import { GameSessionEffects } from './game-session.effects';

describe('GameSessionEffects', () => {
    let actions: Observable<any>;
    let effects: GameSessionEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NxModule.forRoot()],
            providers: [GameSessionEffects, provideMockActions(() => actions)],
        });

        effects = TestBed.inject(GameSessionEffects);
    });

    it('should create', () => {
        expect(effects).toBeTruthy()
    })
});
