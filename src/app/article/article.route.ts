import { Route } from "@angular/router";
import { ArticleDetailComponent } from "./detail/detail.component";

export const ARTICLE_ROUTE: Route = {
    path: 'article/:id',
    component: ArticleDetailComponent
}