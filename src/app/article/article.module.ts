import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ARTICLE_ROUTES } from './article.route';
import { ArticleDetailComponent } from './detail/detail.component';
import { SharedModule } from '@/shared/shared.module';
import { CommonModule } from '@angular/common';
import { DetailResolver } from '@/article/detail/detail.resolver';

@NgModule({
    declarations: [
        ArticleDetailComponent
    ],
    imports: [
        RouterModule.forRoot(ARTICLE_ROUTES),
        SharedModule,
        CommonModule
    ],
    providers: [
        DetailResolver
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArticleModule {
}
