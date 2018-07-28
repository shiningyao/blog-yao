import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ARTICLE_ROUTE } from './article.route';
import { ArticleDetailComponent } from './detail/detail.component';

@NgModule({
    declarations: [
        ArticleDetailComponent
    ],
    imports: [ 
        RouterModule.forChild([ARTICLE_ROUTE])
     ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ArticleModule {}