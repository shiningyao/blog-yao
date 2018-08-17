import { Routes } from '@angular/router';
import { HeaderComponent } from './header.component';
import { CarouselComponent } from '@/layouts/header/carousel/carousel.component';

export const headerRoutes: Routes  = [{
    path: '',
    component: HeaderComponent,
    outlet: 'header'
}, {
    path: '',
    component: CarouselComponent,
    outlet: 'carousel',
    pathMatch: 'full'
}];
