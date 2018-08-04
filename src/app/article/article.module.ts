import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ARTICLE_ROUTE } from './article.route';
import { ArticleDetailComponent } from './detail/detail.component';
import { SharedModule } from '@/shared/shared.module';

@NgModule({
    declarations: [
        ArticleDetailComponent
    ],
    imports: [ 
        RouterModule.forChild([ARTICLE_ROUTE]),
        SharedModule
     ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArticleModule {}