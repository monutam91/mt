import { Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';

import ResizeObserver from 'resize-observer-polyfill';

import { Breakpoint } from './models/breakpoints.model';

@Directive({
    selector: '[mtElementResponsivity]'
})
export class ElementResponsivityDirective implements OnDestroy {
    private _observer: ResizeObserver;

    @Input('mtElementResponsivity')
    public breakpoints: Breakpoint[];

    constructor(private _host: ElementRef, private _renderer: Renderer2) {
        this._observer = new ResizeObserver(entries => {
            const entry = entries.find(e => e.target.tagName === this._host.nativeElement.tagName);
            if (!entry) {
                return;
            }

            const breakpoints = this.breakpoints || [];
            const sortedBreakPoints = breakpoints.sort((a, b) => b.maxWidth - a.maxWidth);
            const currentBreakpoint = sortedBreakPoints.find(point => entry.contentRect.width <= point.maxWidth);

            breakpoints.forEach(point => this._renderer.removeAttribute(this._host.nativeElement, point.attribute));

            if (!currentBreakpoint) {
                return;
            }
            this._renderer.setAttribute(this._host.nativeElement, currentBreakpoint.attribute, '');
        });

        this._observer.observe(this._host.nativeElement);
    }

    public ngOnDestroy() {
        this._observer.disconnect();
    }
}
