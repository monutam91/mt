import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MtInfoItemComponent } from './info-item/info-item.component';
import { InfosComponent } from './infos.component';
import { ElementResponsivityModule } from '../../directives/public_api';

@NgModule({
    declarations: [InfosComponent, MtInfoItemComponent],
    imports: [CommonModule, ElementResponsivityModule],
    exports: [InfosComponent, MtInfoItemComponent]
})
export class InfosModule {}
