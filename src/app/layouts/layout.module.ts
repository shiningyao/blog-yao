import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '@/layouts/main/main.component';
import { HeaderComponent, TopbarComponent, CarouselComponent } from '@/layouts/header';
import { FooterComponent } from '@/layouts/footer';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@/shared/shared.module';

@NgModule({
    declarations: [
        LayoutComponent,
        HeaderComponent,
        TopbarComponent,
        CarouselComponent,
        FooterComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule
    ],
    exports: [
        LayoutComponent,
        HeaderComponent,
        TopbarComponent,
        CarouselComponent,
        FooterComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutModule { }