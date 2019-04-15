import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MonthYearPickerModule } from './month-year-picker';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, FormsModule, MonthYearPickerModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
