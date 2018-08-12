import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title, TransferState, makeStateKey } from '@angular/platform-browser';
import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Apollo, QueryRef } from '@/shared/apollo';
import gql from 'graphql-tag';
import { isPlatformServer } from '@angular/common';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {

    postsRef: QueryRef<any>;
    posts = [];

    constructor(
        private readonly title: Title,
        @Inject(PLATFORM_ID) private readonly platformId: Object,
        private route: ActivatedRoute,
        private readonly apollo: Apollo,
        private readonly http: HttpClient,
        private readonly transferState: TransferState
    ) {
    }

    truncateHtmlOptions(postId: string) {
        return {
            ellipsis: `...
            <a href="/article/${postId}" class="more-link">
                <span class="readmore-blog">
                    Continue reading
                    <i class="fa fa-long-arrow-right"></i>
                </span>
            </a>
            `
        };
    }

    ngOnInit(): void {
        this.title.setTitle('BlogYao');
        this.posts = this.route.snapshot.data['posts'];
        // this.postsRef = this.apollo.watchQuery<any>({
        //     query: gql`
        //         query fetchArticles($status: ArticleStatus) {
        //             articles(status: $status) {
        //                 id
        //                 title,
        //                 content,
        //                 publishDate,
        //                 author {
        //                     id,
        //                     login
        //                 }
        //             }
        //         }
        //     `,
        //     variables: {
        //         status: 'ONLINE'
        //     }
        // });

        // this.postsRef.valueChanges.subscribe(
        //     res => {
        //         this.posts = res.data.articles;
        //         // if (isPlatformServer(this.platformId)) {
        //         //     this.transferState.set(HOME_POSTS_KEY, this.posts);
        //         // }
        //     },
        //     error => {
        //         console.log(error);
        //     }
        // );
     }
}
