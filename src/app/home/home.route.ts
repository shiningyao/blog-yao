import { Route } from '@angular/router';
import { HomeComponent } from './home.component';
import { HomeResolver } from '@/home/home.resolver';



export const HOME_ROUTE: Route = {
    path: '',
    component: HomeComponent,
    resolve: {
        posts: HomeResolver
    }
};
