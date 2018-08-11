import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ARTICLE_ROUTE } from './article.route';
import { ArticleDetailComponent } from './detail/detail.component';
import { SharedModule } from '@/shared/shared.module';
import { CommonModule } from '@angular/common';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Apollo } from '@/shared/apollo';
import { HttpLink } from '@/shared/apollo/link-http';

@NgModule({
    declarations: [
        ArticleDetailComponent
    ],
    imports: [ 
        RouterModule.forRoot([ARTICLE_ROUTE]),
        SharedModule,
        CommonModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArticleModule {
}