import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Router, Routes } from '@angular/router';

import { 
  LayoutComponent, 
  TopbarComponent, 
  HeaderComponent, 
  CarouselComponent 
} from './layouts';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { LogoComponent } from './components/logo/logo.component';
import { WindowRef } from './shared/tools/window.service';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home';
import { AboutModule } from './about';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    TopbarComponent,
    CarouselComponent,
    LogoComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'blogYao' }),
    AppRoutingModule,
    HomeModule,
    AboutModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
