import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import { ABOUT_ROUTES } from './about.route';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        AboutComponent
    ],
    imports: [
        RouterModule.forChild([ABOUT_ROUTES])
    ],
   schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AboutModule {}