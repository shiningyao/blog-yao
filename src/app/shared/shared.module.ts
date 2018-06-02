import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowRef } from './tools/window.service';
import { HrefDirective } from './tools/href.directive';

@NgModule({
    declarations: [
        HrefDirective
    ],
    imports: [ CommonModule ],
    exports: [ HrefDirective ]
})
export class SharedModule {}