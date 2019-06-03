import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MtInfoItemComponent } from './info-item/info-item.component';
import { InfosComponent } from './infos.component';

@NgModule({
    declarations: [InfosComponent, MtInfoItemComponent],
    imports: [CommonModule],
    exports: [InfosComponent, MtInfoItemComponent]
})
export class InfosModule {}
