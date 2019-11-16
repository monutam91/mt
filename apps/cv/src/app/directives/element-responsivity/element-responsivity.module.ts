import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementResponsivityDirective } from './element-responsivity.directive';

@NgModule({
    declarations: [ElementResponsivityDirective],
    imports: [CommonModule],
    exports: [ElementResponsivityDirective]
})
export class ElementResponsivityModule {}
