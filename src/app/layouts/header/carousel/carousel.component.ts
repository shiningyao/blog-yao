import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.scss']
})
export class CarouselComponent implements OnInit, AfterViewInit {

    @ViewChild('carouselContainer', {
        read: ElementRef
    }) carouselContainer: ElementRef;
    isTransition: boolean = false;
    private isBrowser: boolean = false;

    constructor(@Inject(PLATFORM_ID) private platformId) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    ngOnInit(): void { }

    ngAfterViewInit() {
        if(this.isBrowser) {
            import('tiny-slider-yao').then((lib) => {
                const slider = lib.tns({
                    container: this.carouselContainer.nativeElement,
                    items: 3,
                    speed: 1000,
                    slideBy: 'page',
                    autoplay: true,
                    autoplayButtonOutput: false,
                    controls: false
                });
                slider.events.on('transitionStart', () => {
                    this.isTransition = true;
                });
                slider.events.on('transitionEnd', () => {
                    this.isTransition = false;
                });
            });
        }
    }
}
