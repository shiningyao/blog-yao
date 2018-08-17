import { isPlatformServer } from '@angular/common';
import { Apollo, QueryRef } from '@/shared/apollo';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable, of, Observer } from 'rxjs';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import gql from 'graphql-tag';
import { Pageable } from '@/shared/interfaces/page';

@Injectable()
export class HomeResolver implements Resolve<any> {

    constructor(
        private readonly apollo: Apollo,
        @Inject(PLATFORM_ID) private readonly platformId,
        private transferState: TransferState
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{
        posts: any[],
        postsRef: QueryRef<any[]>
    }> {
        const HOME_POSTS_KEY = makeStateKey('HOME_POSTS');
        const postsRef = this.apollo.watchQuery<any, {
            status: string,
            pageable: Pageable
        }>({
            query: gql`
                query fetchArticles($status: ArticleStatus, $pageable: Pageable) {
                    articles(status: $status, pageable: $pageable) {
                        content {
                            id,
                            title
                        }
                        # id
                        # title,
                        # content,
                        # publishDate,
                        # author {
                        #     id,
                        #     login
                        # }
                    }
                }
            `,
            variables: {
                status: 'ONLINE',
                pageable: {
                    page: 0,
                    size: 4
                }
            }
        });
        if (this.transferState.hasKey(HOME_POSTS_KEY)) {
            const posts = this.transferState.get<any[]>(HOME_POSTS_KEY, null) || [];
            this.transferState.remove(HOME_POSTS_KEY);
            return of({
                posts,
                postsRef
            });
        } else {
            return Observable.create((observer: Observer<{
                posts: any[],
                postsRef: QueryRef<any[]>
            }>) => {
                postsRef.valueChanges.subscribe((res) => {
                    const posts = res.data.articles || [];
                    if (isPlatformServer(this.platformId)) {
                        this.transferState.set(HOME_POSTS_KEY, posts);
                    }
                    observer.next({
                        posts,
                        postsRef
                    });
                    observer.complete();
                });
            });
        }
    }
}
