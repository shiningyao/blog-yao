import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.scss']
})
export class FooterComponent implements OnInit {
    constructor(
        private viewportScroller: ViewportScroller
    ) { }

    ngOnInit(): void { }

    scrollToTop() {
        this.viewportScroller.scrollToPosition([0, 0]);
    }
}
