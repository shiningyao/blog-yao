import { NgModule } from '@angular/core';
import { headerRoutes, footerRoutes } from './layouts';
import { DEBUG_INFO_ENABLED } from './app.constants';
import { RouterModule, PreloadAllModules } from '@angular/router';

const LAYOUT_ROUTES = [
    ...headerRoutes,
    ...footerRoutes
];

@NgModule({
    imports: [
        RouterModule.forRoot(LAYOUT_ROUTES, {
            useHash: false,
            enableTracing: DEBUG_INFO_ENABLED,
            preloadingStrategy: PreloadAllModules,
            scrollPositionRestoration: 'enabled'
        })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}
