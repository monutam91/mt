import { Directive, ElementRef } from '@angular/core';

@Directive({
    selector: '[mtScrollWithBody]'
})
export class ScrollWithBodyDirective {
    constructor(private _el: ElementRef) {
        document.body.addEventListener('wheel', event => this._onWheel(event));
    }

    private _onWheel(event: WheelEvent) {
        event.stopImmediatePropagation();
        event.stopPropagation();
        this._el.nativeElement.scrollBy(0, event.deltaY);
    }
}
