import { Component, OnInit, Inject, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { trigger, transition, style, animate, keyframes, state } from '@angular/animations';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.scss'],
    animations: [
        trigger('collapseState', [
            transition('false => true', [
                style({
                    height: '*'
                }),
                animate('500ms ease-in-out', keyframes([
                    style({ height: '100%', transform: 'scaleY(1)', offset: 0 }),
                    style({ height: '98%', transform: 'scaleY(0.98)', offset: 0.6 }),
                    style({ height: '102%', transform: 'scaleY(1.02)', offset: 0.8 }),
                    style({ height: 0, transform: 'scaleY(0)', offset: 1 })
                ]))
            ]),
            transition('true => false', [
                style({
                    height: 0
                }),
                animate('400ms ease-out', keyframes([
                    style({ height: '10%', transform: 'scaleY(0.1)', offset: 0 }),
                    style({ height: '104%', transform: 'scaleY(1.04)', offset: 0.4 }),
                    style({ height: '98%', transform: 'scaleY(0.98)', offset: 0.6 }),
                    style({ height: '104%', transform: 'scaleY(1.04)', offset: 0.8 }),
                    style({ height: '100%', transform: 'scaleY(1)', offset: 1 })
                ]))
            ])
        ])
    ]
})
export class TopbarComponent implements OnInit, AfterViewInit {

    @ViewChild('navbarContainer', { read: ElementRef }) navbarContainerRef: ElementRef;
    collapsed = true;

    constructor(@Inject(DOCUMENT) private document: Document) {
    }

    ngOnInit(): void { }

    ngAfterViewInit() {
        const navbarContainer: HTMLDivElement = this.navbarContainerRef.nativeElement;
        const originTop = navbarContainer.offsetTop;
        let prevTop = 0;
        this.document.addEventListener('scroll', () => {
            const scrollTop = this.document.documentElement.scrollTop;
            if (scrollTop >= originTop - 10) {
                if (!navbarContainer.classList.contains('sticky')) {
                    navbarContainer.classList.add('sticky');
                }
            } else {
                if (navbarContainer.classList.contains('sticky')) {
                    navbarContainer.classList.remove('sticky');
                }
            }
            prevTop = scrollTop;
        });
    }
}
