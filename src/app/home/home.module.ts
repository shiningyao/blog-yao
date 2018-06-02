import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HomeComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { HOME_ROUTE } from './home.route';

@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [ 
        RouterModule.forChild([HOME_ROUTE])
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule {}