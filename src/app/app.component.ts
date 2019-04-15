import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    date1: Date = new Date();
    date2: Date;
    date3: Date;
    date3Min: Date = new Date();
    date4: Date;


    onDate1Change() {
        console.log(this.date1);
    }

    onDate2Change() {
        console.log(this.date1);
    }

    onDate3Change() {
        console.log(this.date1);
    }

    onDate4Change() {
        console.log(this.date1);
    }
}
