import {NgModule} from '@angular/core';
import {PersianDatePipe} from './persian-date.pipe';

@NgModule({
    imports: [],
    declarations: [
        PersianDatePipe
    ],
    exports: [
        PersianDatePipe
    ],
    providers: [
        PersianDatePipe
    ],
})
export class SharedModule {
}
