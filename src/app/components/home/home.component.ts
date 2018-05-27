import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    template: 'app home page'
})
export class HomeComponent implements OnInit {
    constructor(private title: Title) { }

    ngOnInit(): void {
        this.title.setTitle('BlogYao');
     }
}
