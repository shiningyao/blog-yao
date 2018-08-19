import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeResolver } from '@/home/home.resolver';

export const HOME_ROUTES: Routes = [{
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    resolve: {
        postsAndQuery: HomeResolver
    }
}];
