import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LabelValueComponent } from './label-value.component';

describe('LabelValueComponent', () => {
    let component: LabelValueComponent;
    let fixture: ComponentFixture<LabelValueComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [LabelValueComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(LabelValueComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
