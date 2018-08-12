import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from '@/shared/apollo';
import { ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'article-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.scss']
})
export class ArticleDetailComponent implements OnInit {

    private postRef: QueryRef<any>;
    article: any;

    constructor(
        private title: Title,
        private readonly apollo: Apollo,
        private readonly route: ActivatedRoute
    ) {
        // this.route.params.subscribe(params => {
        //     const id = params.id;
        //     this.postRef = apollo.watchQuery({
        //         query: gql`
        //             query getArticle($id: String) {
        //                 article(id: $id) {
        //                     id,
        //                     title,
        //                     content,
        //                     author {
        //                         id,
        //                         login
        //                     }
        //                 }
        //             }
        //         `,
        //         variables: {
        //             id
        //         }
        //     });

        //     this.postRef.valueChanges.subscribe(res => {
        //         this.article = res.data.article;
        //         this.title.setTitle(this.article.title);
        //     }, error => {

        //     });
        // });
    }

    ngOnInit(): void {
        this.article = this.route.snapshot.data['post'];
        this.title.setTitle(this.article.title);
    }
}
