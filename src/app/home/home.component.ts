import { ActivatedRoute, Router, Scroll } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { QueryRef } from '@/shared/apollo';
import { ViewportScroller, isPlatformBrowser } from '@angular/common';
import { Subscription, fromEvent } from 'rxjs';
import { Pageable } from '@/shared/interfaces/page';
import { ApolloQueryResult } from 'apollo-client';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

    static scrollPosition: [number, number] = [0, 0];
    static pager: Pageable = {
        page: 0,
        size: 4
    };

    postsRef: QueryRef<any>;
    posts = {
        content: [],
        last: false,
        first: false
    };
    pager: Pageable = HomeComponent.pager;
    routerEventsSubscription: Subscription;
    scrollEventSubscription: Subscription;
    queryEventSubscription: Subscription;

    constructor(
        private readonly title: Title,
        @Inject(PLATFORM_ID) readonly platformId,
        route: ActivatedRoute,
        router: Router,
        private readonly viewportScroller: ViewportScroller
    ) {
        const { postsRef, posts } = route.snapshot.data['postsAndQuery'];
        this.postsRef = postsRef;
        this.posts = posts;
        this.routerEventsSubscription = router.events.subscribe((e) => {
            if (e instanceof Scroll) {
                viewportScroller.scrollToPosition(HomeComponent.scrollPosition);
            }
        });
        if (isPlatformBrowser(platformId)) {
            this.scrollEventSubscription = fromEvent(document, 'scroll').subscribe(() => {
                HomeComponent.scrollPosition = viewportScroller.getScrollPosition();
            });
        }
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
        if (!this.posts) {
            this.queryEventSubscription = this.postsRef.valueChanges.subscribe((res) => {
                this.posts = res.data.articles;
            });
        }
    }

    ngOnDestroy(): void {
        if ( this.routerEventsSubscription) {
            this.routerEventsSubscription.unsubscribe();
        }
        if (this.scrollEventSubscription) {
            this.scrollEventSubscription.unsubscribe();
        }
        if (this.queryEventSubscription) {
            this.queryEventSubscription.unsubscribe();
        }
        HomeComponent.pager = this.pager;
    }

    newerPosts() {
        this.pager.page--;
        this.fetchMore().then(res => {
            this.posts = res.data.articles;
            this.viewportScroller.scrollToPosition([0, 0]);
        });
    }

    olderPosts() {
        this.pager.page++;
        this.fetchMore().then(res => {
            this.posts = res.data.articles;
            this.viewportScroller.scrollToPosition([0, 0]);
        });
    }

    fetchMore(): Promise<ApolloQueryResult<any>> {
        const variables = {
            pageable: this.pager
        };
        console.log(this.postsRef);
        if (!this.postsRef.getLastResult()) {
            this.postsRef.setVariables(variables);
            return new Promise<ApolloQueryResult<any>>((resolve, reject) => {
                this.queryEventSubscription = this.postsRef.valueChanges.subscribe((res) => {
                    resolve(res);
                }, (error) => {
                    reject(error);
                });
            });
        } else {
            return this.postsRef.fetchMore({
                variables,
                updateQuery: (prev, {fetchMoreResult}) => {
                    if (!fetchMoreResult) {
                        return prev;
                    }
                    return fetchMoreResult;
                }
            });
        }
    }
}
