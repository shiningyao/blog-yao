import { Directive, Input, OnInit } from '@angular/core';

@Directive({
    selector: 'a[href]',
    host: {
        '(click)': 'onClick($event)'
    }
})
export class HrefDirective implements OnInit {

    @Input() href: string;

    constructor() {
    }
    
    ngOnInit() {
        if(this.href.trim() === '') {

        }
    }

    onClick(event: MouseEvent) {
        event.preventDefault();
    }
}