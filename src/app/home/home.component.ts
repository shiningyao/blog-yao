// import { Apollo, QueryRef } from 'apollo-angular';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from '@/shared/apollo';
import gql from 'graphql-tag';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {

    postsRef: QueryRef<any>;
    posts = [];

    constructor(
        private title: Title,
        private readonly apollo: Apollo
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
        this.postsRef = this.apollo.watchQuery<any>({
            query: gql`
                query fetchArticles($status: ArticleStatus) {
                    articles(status: $status) {
                        id
                        title,
                        content,
                        publishDate,
                        author {
                            id,
                            login
                        }
                    }
                }
            `,
            variables: {
                status: 'ONLINE'
            }
        });

        this.postsRef.valueChanges.subscribe(
            res => {
                this.posts = res.data.articles;
            }
        );
     }
}
