import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MtInfoItemComponent } from './info-item.component';

@NgModule({
    declarations: [MtInfoItemComponent],
    imports: [CommonModule],
    exports: [MtInfoItemComponent]
})
export class MtInfoItemModule {}
