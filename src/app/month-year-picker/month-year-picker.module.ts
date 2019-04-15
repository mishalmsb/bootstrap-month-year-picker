import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    ClickOutsideModule,
    DigitOnlyModule,
    PreventTypingModule
} from '../directives';
import { MonthYearPickerComponent } from "./month-year-picker.component";
import { MonthYearPickerService } from './month-year-picker.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ClickOutsideModule,
        DigitOnlyModule,
        PreventTypingModule
    ],
    declarations: [
        MonthYearPickerComponent
    ],
    providers: [ MonthYearPickerService ],
    exports: [ MonthYearPickerComponent ]
})
export class MonthYearPickerModule {}
