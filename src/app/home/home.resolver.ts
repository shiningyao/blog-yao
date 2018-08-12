import { isPlatformServer } from '@angular/common';
import { Apollo } from '@/shared/apollo';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import gql from 'graphql-tag';
import { flatMap } from 'rxjs/operators';

@Injectable()
export class HomeResolver implements Resolve<any> {

    constructor(
        private readonly apollo: Apollo,
        @Inject(PLATFORM_ID) private readonly platformId,
        private transferState: TransferState
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any[]> {
        const HOME_POSTS_KEY = makeStateKey('HOME_POSTS');
        if (this.transferState.hasKey(HOME_POSTS_KEY)) {
            const posts = this.transferState.get<any[]>(HOME_POSTS_KEY, null);
            this.transferState.remove(HOME_POSTS_KEY);
            return of(posts);
        } else {
            return this.apollo.query<any>({
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
            }).pipe(flatMap(res => {
                if (isPlatformServer(this.platformId)) {
                    this.transferState.set(HOME_POSTS_KEY, res.data.articles);
                }
                return of(res.data.articles);
            }));
        }
    }
}
