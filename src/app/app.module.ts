import { BrowserModule, BrowserTransferStateModule, makeStateKey, TransferState } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

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
import { ArticleModule } from './article';

const STATE_KEY = makeStateKey<any>('apollo.state');

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
    ArticleModule,
    SharedModule,
    ApolloModule,
    HttpLinkModule,
    BrowserTransferStateModule,
    HttpClientModule,
    HttpClientXsrfModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  cache: InMemoryCache;

  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
    private readonly transferState: TransferState
  ) {
    this.cache = new InMemoryCache();

    apollo.create({
      link: httpLink.create({
        uri: '/api/query'
      }),
      cache: this.cache
    });

    const isBrowser = this.transferState.hasKey<any>(STATE_KEY);

    if (isBrowser) {
      this.onBrowser();
    } else {
      this.onServer();
    }
  }

  onBrowser() {
    const state = this.transferState.get<any>(STATE_KEY, null);
    this.cache.restore(state);
  }

  onServer() {
    this.transferState.onSerialize(STATE_KEY, () => {
      return this.cache.extract();
    });
  }
}
