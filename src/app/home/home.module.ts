import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { HOME_ROUTE } from './home.route';
import { SharedModule } from '../shared/shared.module';
import { HomeResolver } from '@/home/home.resolver';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        RouterModule.forChild([HOME_ROUTE]),
        CommonModule,
        SharedModule
    ],
    providers: [
        HomeResolver
    ],
    exports: [
        HomeComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule {}
