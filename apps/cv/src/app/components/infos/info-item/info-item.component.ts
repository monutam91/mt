import { Component, ChangeDetectionStrategy, ElementRef, OnDestroy } from '@angular/core';
import ResizeObserver from 'resize-observer-polyfill';

import { Subject } from 'rxjs';

import { Size } from '../models';
import { Breakpoint } from '../../../directives/public_api';

@Component({
    selector: 'mt-info-item',
    templateUrl: './info-item.component.html',
    styleUrls: ['./info-item.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MtInfoItemComponent implements OnDestroy {
    private _resizeObserver: ResizeObserver;
    private _resized: Subject<Size>;

    public readonly breakpoints: Breakpoint[] = [
        {
            attribute: 'small',
            maxWidth: 700
        }
    ];

    constructor(private _host: ElementRef) {
        this._resizeObserver = new ResizeObserver((entries, observer) => {
            const entry = entries.find(entry => entry.target.tagName === 'mt-info_item');
            if (!!entry) {
                const { left, top, width, height } = entry.contentRect;
                this._resized.next({ left, top, width, height });
            }
        });
        this._resizeObserver.observe(this._host.nativeElement);
    }

    public ngOnDestroy() {
        this._resizeObserver.disconnect();
    }
}
