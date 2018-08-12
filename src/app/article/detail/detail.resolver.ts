import { isPlatformServer } from '@angular/common';
import { Apollo } from '@/shared/apollo';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import gql from 'graphql-tag';
import { flatMap } from 'rxjs/operators';

@Injectable()
export class DetailResolver implements Resolve<any> {

    constructor(
        private readonly apollo: Apollo,
        @Inject(PLATFORM_ID) private readonly platformId,
        private transferState: TransferState
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        const postId = route.params['id'];
        const POST_KEY = makeStateKey('POST' + postId);
        if (this.transferState.hasKey(POST_KEY)) {
            const post = this.transferState.get<any[]>(POST_KEY, null);
            this.transferState.remove(POST_KEY);
            return of(post);
        } else {
            return this.apollo.query<any>({
                query: gql`
                    query getArticle($id: String) {
                        article(id: $id) {
                            id,
                            title,
                            content,
                            author {
                                id,
                                login
                            }
                        }
                    }
                `,
                variables: {
                    id: postId
                }
            }).pipe(flatMap(res => {
                if (isPlatformServer(this.platformId)) {
                    this.transferState.set(POST_KEY, res.data.article);
                }
                return of(res.data.article);
            }));
        }
    }
}
