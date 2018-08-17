import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { QueryRef } from '@/shared/apollo';

@Component({
    selector: 'article-detail',
    templateUrl: './detail.component.html',
    styleUrls: ['./detail.scss']
})
export class ArticleDetailComponent implements OnInit, OnDestroy {
    
    private postRef: QueryRef<any>;
    article: any;
    routerEventsSubscription: Subscription;
    querySubscription: Subscription;

    constructor(
        private title: Title,
        private readonly zone: NgZone,
        private readonly route: ActivatedRoute,
        router: Router
    ) {
        const {postRef, post} = this.route.snapshot.data['postAndQuery'];
        this.postRef = postRef;
        this.article = post;
        this.routerEventsSubscription = router.events.subscribe((e) => {
            if(e instanceof NavigationEnd) {
                this.zone.run(() => {
                    const {postRef, post} = this.route.snapshot.data['postAndQuery'];
                    this.postRef = postRef;
                    if(!post) {
                        if(this.querySubscription) {
                            this.querySubscription.unsubscribe();
                        }
                        this.querySubscription = this.postRef.valueChanges.subscribe(res => {
                            this.article = res.data.article;
                            this.title.setTitle(this.article.title);
                        });
                    } else {
                        this.article = post;
                    }
                });
            }
        });
    }

    ngOnInit(): void {
        if(!this.article) {
            this.querySubscription = this.postRef.valueChanges.subscribe(res => {
                this.article = res.data.article;
                this.title.setTitle(this.article.title);
            });
        }
    }

    ngOnDestroy(): void {
        this.routerEventsSubscription.unsubscribe();
        if(this.querySubscription) {
            this.querySubscription.unsubscribe();
        }
    }
}
