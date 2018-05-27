import { Component, OnInit, ElementRef, AfterViewInit, Input } from '@angular/core';

@Component({
    selector: 'yaoshen-logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit, AfterViewInit {

    @Input() width = 100;
    @Input() height = 200;

    constructor(private elementRef: ElementRef) {
    }

    ngOnInit(): void {
        console.log(this.width);
    }

    ngAfterViewInit(): void {
        const element: HTMLDivElement = this.elementRef.nativeElement;
        console.log(element.innerHTML);
    }
}
