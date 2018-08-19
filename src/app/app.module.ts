import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule, Inject, PLATFORM_ID, APP_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { TransferHttpCacheModule } from '@nguniversal/common';

import {
  LayoutComponent,
  TopbarComponent,
  HeaderComponent,
  CarouselComponent,
  FooterComponent
} from './layouts';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeModule } from './home';
import { AboutModule } from './about';
import { ArticleModule } from './article';
import { Apollo, ApolloModule } from '@/shared/apollo';
import { HttpLink, HttpLinkModule } from '@/shared/apollo/link-http';
import { LayoutModule } from '@/layouts/layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'blogYao' }),
    TransferHttpCacheModule,
    AppRoutingModule,
    HomeModule,
    LayoutModule,
    AboutModule,
    ArticleModule,
    SharedModule.forRoot(),
    ApolloModule,
    HttpLinkModule,
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientXsrfModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  readonly API_ROOT = 'http://localhost:3000';

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
        uri: this.API_ROOT + '/api/query'
      }),
      cache: new InMemoryCache()
    });
  }

}
