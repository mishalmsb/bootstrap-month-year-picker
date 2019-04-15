import { Component, Input, forwardRef, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';
import { Month, MONTHS } from './models';
import { MonthYearPickerService } from './month-year-picker.service';

import * as _ from 'lodash';

const noop = () => {};

@Component({
    selector: 'month-year-picker',
    templateUrl: './month-year-picker.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MonthYearPickerComponent),
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => MonthYearPickerComponent),
            multi: true
        }
    ]
})
export class MonthYearPickerComponent {
    @Input('name') name: string = 'month-year-picker';
    @Input('required') required: boolean = false;
    @Input('disabled') disabled: boolean = false;
    @Input('min-date') minDate: Date = null;
    @Input('placeholder') placeholder: string = 'Select date';

    date: Date;
    displayDate: string = null;
    selectedMonth: Month = null;
    selectedYear: number = null;
    isCalanderVisible: boolean = false;
    months: Month[] = MONTHS;
    displayYearInputName: string = '-display-year';
    isDirty: boolean = false;
    isInvalid: Object = null;

    constructor(private _monthYearPickerService: MonthYearPickerService) {}

    // ngOnChanges(changes: SimpleChanges) {
    //     console.log(changes)
    // }

    onYearChange() {
        this.onYearMonthChange();
    }

    clearMonthYearIfInvalid() {
        if (!this.selectedMonth || !this.selectedYear) {
            this.selectedMonth = null;
            this.selectedYear = null;
        }
    }

    selectMonth(month: Month) {
        if (this.selectedMonth && this.selectedMonth == month) {
            this.selectedMonth = null;
        } else {
            this.selectedMonth = month;
        }
        this.onYearMonthChange();
        this.closeIfDateValid();
    }

    closeIfDateValid() {
        if (this.date) {
            this.toggleShowCalander();
        }
    }

    onYearMonthChange() {
        this.setDate();
        this.setDirty();
        if (this.isDirty) {
            this.onChange();
        }
    }

    setDirty() {
        if (!this.isDirty && this.selectedMonth && this.selectedYear) {
            this.isDirty = true;
        }
    }

    removeYear() {
        this.selectedYear--;
        this.onYearChange();
    }

    addYear() {
        this.selectedYear++;
        this.onYearChange();
    }

    setDate() {
        this.setDisplayDate();
        if (this.selectedMonth && this.selectedYear) {
            this.date = this._monthYearPickerService.formatToDate(
                this.selectedYear,
                this.selectedMonth.id
            );
            this.validateDate();
        } else {
            this.date = null;
        }
    }

    validateDate() {
        if (!this._monthYearPickerService.isDateValid(this.date)) {
            this.date = null;
            this.displayDate = null;
        }
    }

    setDisplayDate() {
        if (this.selectedMonth && this.selectedYear) {
            this.displayDate = `${this.selectedMonth.shortName}, ${
                this.selectedYear
            }`;
        } else {
            this.displayDate = null;
        }
    }

    getMonthById(monthId: number): Month {
        return _.find(MONTHS, { id: monthId });
    }

    onChange() {
        this.onChangeCallback(this.date);
    }

    onClickOutside() {
        this.onBlur();
        this.hideCalander();
        this.onChange();
    }

    onCalanderIconClick() {
        if (!this.disabled) {
            document
                .getElementById(this.name + this.displayYearInputName)
                .focus();
        }
    }

    clear() {
        this.date = null;
        this.displayDate = null;
        this.selectedMonth = null
        this.selectedYear = null;
        this.onChange();
    }

    onFocus() {
        this.toggleShowCalander();
    }

    onBlur() {
        this.isDirty = true;
        this.clearMonthYearIfInvalid();
        this.onTouchedCallback();
    }

    toggleShowCalander() {
        this.isCalanderVisible = !this.isCalanderVisible;
        this.setCurrentYear();
    }

    setCurrentYear() {
        if (!this.selectedYear && this.isCalanderVisible) {
            this.selectedYear = new Date().getFullYear()
        }
    }

    showCalander() {
        this.isCalanderVisible = true;
    }

    hideCalander() {
        this.isCalanderVisible = false;
    }

    writeValue(value: Date) {
        this.date = value;
        this.setInitialDate();
    }

    setInitialDate() {
        if (this.date) {
            let month = this._monthYearPickerService.getMonthNumberFromDate(
                this.date
            );
            this.selectedMonth = this.getMonthById(month);
            this.selectedYear = this._monthYearPickerService.getYearNumberFromDate(
                this.date
            );
            this.setDisplayDate();
            this.onChange();
        }
    }

    validate(c: FormControl) {
        this.isInvalid = this.getValidation();
        return this.isInvalid;
    }

    getValidation(): Object {
        if (this.required && !this.date) {
            return { invalid: true };
        } else if (!this.isDateValid()) {
            return { invalid: true, invalidDate: true };
        } else if (this.isMinDateValid()) {
            return { invalid: true, invalidMinDate: true };
        }
        return null;
    }

    isDateValid() {
        if (this.date) {
            return this._monthYearPickerService.isDateValid(this.date);
        }
        return true;
    }

    isMinDateValid() {
        if (this.minDate) {
            return this._monthYearPickerService.isDateMonthYearAfter(
                this.date,
                this.minDate
            );
        }
        return null;
    }

    private onTouchedCallback: () => void = noop;
    private onChangeCallback: (_: Date) => void = noop;

    registerOnChange(fn: any) {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouchedCallback = fn;
    }
}