import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { TruncateHtmlPipe } from '@/shared/pipes/truncate-html.pipe';
import { TimezoneDatePipe } from '@/shared/pipes/timezoneDate';

@NgModule({
    declarations: [
        SafeHtmlPipe,
        TruncateHtmlPipe,
        TimezoneDatePipe
    ],
    imports: [],
    exports: [
        SafeHtmlPipe,
        TruncateHtmlPipe,
        TimezoneDatePipe
    ]
})
export class SharedModule {}
