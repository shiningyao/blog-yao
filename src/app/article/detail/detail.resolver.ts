import { isPlatformServer } from '@angular/common';
import { Apollo, QueryRef } from '@/shared/apollo';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable, of, Observer } from 'rxjs';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import gql from 'graphql-tag';

@Injectable()
export class DetailResolver implements Resolve<any> {

    constructor(
        private readonly apollo: Apollo,
        @Inject(PLATFORM_ID) private readonly platformId,
        private transferState: TransferState
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<{
        post: any,
        postRef: QueryRef<any>
    }> {
        const postId = route.params['id'];
        const POST_KEY = makeStateKey('POST' + postId);
        
        const postRef = this.apollo.watchQuery<any>({
            query: gql`
                query getArticle($id: String) {
                    article(id: $id) {
                        id,
                        title,
                        content,
                        author {
                            id,
                            login
                        },
                        prev {
                            id,
                            title
                        },
                        next {
                            id,
                            title
                        }
                    }
                }
            `,
            variables: {
                id: postId
            }
        });

        if (this.transferState.hasKey(POST_KEY)) {
            const post = this.transferState.get<any>(POST_KEY, null);
            this.transferState.remove(POST_KEY);
            return of({
                post,
                postRef
            });
        } else {
            return Observable.create((observer: Observer<{
                post: any,
                postRef: QueryRef<any>
            }>) => {
                const subscription = postRef.valueChanges.subscribe((res) => {
                    const post = res.data.article;
                    if (isPlatformServer(this.platformId)) {
                        this.transferState.set(POST_KEY, post);
                    }
                    observer.next({
                        post,
                        postRef
                    });
                    subscription.unsubscribe();
                    observer.complete();
                });
            });
        }
    }
}
