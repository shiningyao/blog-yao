import { PipeTransform, Pipe } from "@angular/core";
import { parseZone, Moment } from 'moment';

@Pipe({
    name: 'timezoneDate'
})
export class TimezoneDatePipe implements PipeTransform {

    transform(value: string, format: string = 'll'): string {
        return parseZone(value).format(format);
    }

}