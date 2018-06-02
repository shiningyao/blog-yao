import { Component, OnInit, Inject, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit, AfterViewInit {

    @ViewChild('navbarContainer', { read: ElementRef }) navbarContainerRef: ElementRef;

    constructor(@Inject(DOCUMENT) private document: Document) {
    }

    ngOnInit(): void { }

    ngAfterViewInit() {
        const navbarContainer: HTMLDivElement = this.navbarContainerRef.nativeElement;
        const originTop = navbarContainer.offsetTop;
        let prevTop = 0;
        this.document.addEventListener('scroll', () => {
            const scrollTop = this.document.documentElement.scrollTop;
            if(scrollTop >= originTop - 10) {
                if(!navbarContainer.classList.contains('sticky')) {
                    navbarContainer.classList.add('sticky');
                }
            } else {
                if(navbarContainer.classList.contains('sticky')) {
                    navbarContainer.classList.remove('sticky');
                }
            }
            prevTop = scrollTop;
        });
    }
}
