import { PipeTransform, Pipe } from '@angular/core';
import truncate = require('truncate-html/dist/truncate.cjs');

@Pipe({
    name: 'truncateHtml'
})
export class TruncateHtmlPipe implements PipeTransform {

    transform(value: string, length: number = 100, options: any = {}): string {
        if (typeof value !== 'string') {
            throw new Error(`Could not truncate a '${typeof value}' type value.`);
        }
        const truncateOptions = Object.assign({
            length
        }, options);
        return truncate(value, truncateOptions);
    }

}
