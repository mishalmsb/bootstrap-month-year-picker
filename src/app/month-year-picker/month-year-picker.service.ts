import { Injectable } from '@angular/core';

@Injectable()
export class MonthYearPickerService {
    constructor() {}

    public formatToDate(year: number, month: number): Date {
        return new Date(Date.UTC(year, month - 1, 1, 12, 0, 0));
    }

    public isDateValid(date: any): boolean {
        return date.getTime() === date.getTime();
    }

    public getYearNumberFromDate(date: Date): number {
        return date.getFullYear();
    }

    public getMonthNumberFromDate(date: Date): number {
        return date.getMonth() + 1;
    }

    public isDateMonthYearAfter(startDate: Date, endDate: Date): boolean {
        let start = this.formatToDate(
            this.getYearNumberFromDate(startDate),
            this.getMonthNumberFromDate(startDate)
        );
        let end = this.formatToDate(
            this.getYearNumberFromDate(endDate),
            this.getMonthNumberFromDate(endDate)
        );
        return end > start;
    }
}
