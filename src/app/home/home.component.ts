import { Apollo, QueryRef } from 'apollo-angular';
import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {

    postsRef: QueryRef<any>;

    constructor(
        private title: Title,
        private readonly apollo: Apollo
    ) {}

    ngOnInit(): void {
        this.title.setTitle('BlogYao');
        this.postsRef = this.apollo.watchQuery<any>({
            query: gql`
                query {
                    articles {
                        id
                        title,
                        content,
                        author {
                            id,
                            login
                        }
                    }
                }
            `,
            variables: {}
        });

        this.postsRef.valueChanges.subscribe(result => console.log(result));
     }
}
