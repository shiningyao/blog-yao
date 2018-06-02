import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { headerRoutes } from './layouts/header';
import { DEBUG_INFO_ENABLED } from './app.constants';
import { RouterModule } from '@angular/router';

const LAYOUT_ROUTES = [
    headerRoutes
];

@NgModule({
    imports: [
        RouterModule.forRoot(LAYOUT_ROUTES, { useHash: false , enableTracing: DEBUG_INFO_ENABLED })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}