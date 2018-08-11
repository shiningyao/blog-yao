import { BrowserModule, BrowserTransferStateModule, makeStateKey } from '@angular/platform-browser';
import { NgModule, Inject, PLATFORM_ID, APP_ID } from '@angular/core';
// import { ApolloModule, Apollo } from 'apollo-angular';
// import ApolloClient from 'apollo-client';
import { isPlatformBrowser } from '@angular/common';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
// import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { TransferHttpCacheModule } from '@nguniversal/common';

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
import { Apollo } from '@/shared/apollo';
import { HttpLink, HttpLinkModule } from '@/shared/apollo/link-http';
import { ModuleWithProviders } from '../../node_modules/@angular/compiler/src/core';

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
    HttpLinkModule,
    TransferHttpCacheModule,
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
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    @Inject(APP_ID) private readonly appId: string,
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    const platform = isPlatformBrowser(platformId) ?
      'in the browser' : 'on the server';

    console.log(`Running ${platform} with appId=${appId}`);

    apollo.create({
      link: httpLink.create({
        uri: '/api/query'
      }),
      cache: new InMemoryCache()
    });
  }

}
