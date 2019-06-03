import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LabelValueComponent } from './label-value.component';

@NgModule({
    declarations: [LabelValueComponent],
    imports: [CommonModule],
    exports: [LabelValueComponent]
})
export class MtLabelValueModule {}
