import { Component, OnInit } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-about',
    template: 'app about page'
})
export class AboutComponent implements OnInit {
    constructor(
        private title: Title,
        private meta: Meta
    ) { }

    ngOnInit(): void {
        this.title.setTitle('About Page');
        this.meta.addTag({
            name: 'description',
            content: 'description content'
        });
    }
}
