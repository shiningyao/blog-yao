import { Routes } from '@angular/router';
import { ArticleDetailComponent } from './detail/detail.component';
import { DetailResolver } from '@/article/detail/detail.resolver';

export const ARTICLE_ROUTES: Routes = [{
    path: 'article/:id',
    component: ArticleDetailComponent,
    resolve: {
        postAndQuery: DetailResolver
    }
}];
