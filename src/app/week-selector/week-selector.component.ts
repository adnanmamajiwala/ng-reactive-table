import { Component, OnInit } from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {FormControl} from '@angular/forms';
import * as moment from 'moment';
import {Moment} from 'moment';
import {MatDatepicker} from '@angular/material/datepicker';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MMMM - YYYY',
  },
  display: {
    dateInput: 'MMMM - YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-week-selector',
  templateUrl: './week-selector.component.html',
  styleUrls: ['./week-selector.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class WeekSelectorComponent implements OnInit {

  date = new FormControl(moment().subtract('1', 'months'));
  minDate: Date;
  maxDate: Date;

  constructor() {
  }

  ngOnInit(): void {
    this.minDate = moment().subtract('2', 'years').subtract('1', 'months').toDate();
    this.maxDate = moment().subtract('1', 'months').toDate();
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    ctrlValue.year(normalizedMonth.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

}
