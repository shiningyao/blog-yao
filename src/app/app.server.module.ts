import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { ModuleMapLoaderModule } from '@nguniversal/module-map-ngfactory-loader';
import { Apollo } from '@/shared/apollo';
import { HttpLink } from '@/shared/apollo/link-http';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    ModuleMapLoaderModule
  ],
  providers: [
    Apollo,
    HttpLink
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
