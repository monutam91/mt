import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MtInfoItemComponent } from './info-item.component';

describe('InfoItemComponent', () => {
    let component: MtInfoItemComponent;
    let fixture: ComponentFixture<MtInfoItemComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [MtInfoItemComponent],
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(MtInfoItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
