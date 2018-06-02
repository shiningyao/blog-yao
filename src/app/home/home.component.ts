import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.scss']
})
export class HomeComponent implements OnInit {
    constructor(private title: Title) { }

    ngOnInit(): void {
        this.title.setTitle('BlogYao');
     }
}
