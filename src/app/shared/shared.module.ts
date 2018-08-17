import { NgModule, ModuleWithProviders } from '@angular/core';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { TruncateHtmlPipe } from '../shared/pipes/truncate-html.pipe';
import { TimezoneDatePipe } from '../shared/pipes/timezoneDate';
import { PROVIDERS as APOLLO_HTTP_LINK_PROVIDERS } from '@/shared/apollo/link-http';
import { PROVIDERS as APOLLO_PROVIDERS } from '@/shared/apollo/apollo.module';
import { LogoComponent } from '@/shared/components/logo/logo.component';
import { TagCloudComponent } from '@/shared/components/tagcloud/tagcloud.component';

@NgModule({
    declarations: [
        SafeHtmlPipe,
        TruncateHtmlPipe,
        TimezoneDatePipe,
        LogoComponent,
        TagCloudComponent
    ],
    exports: [
        SafeHtmlPipe,
        TruncateHtmlPipe,
        TimezoneDatePipe,
        LogoComponent,
        TagCloudComponent
    ]
})
export class SharedModule {

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                APOLLO_HTTP_LINK_PROVIDERS,
                APOLLO_PROVIDERS
            ]
        };
    }

}
