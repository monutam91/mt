import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InfosComponent } from './infos.component';

describe('InfosComponent', () => {
    let component: InfosComponent;
    let fixture: ComponentFixture<InfosComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [InfosComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(InfosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
