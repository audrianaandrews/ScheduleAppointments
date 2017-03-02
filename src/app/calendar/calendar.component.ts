import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Appointment} from '../appointment/appointment';
import {Day} from '../day';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{
  @Output() changeMonth = new EventEmitter<number>();
  public days: Day[];
  public date: Date;
  public currentMonth: number;
  public month: string;
  public year: number;
  public currentViewDays: Array<any> = [];
  public weekdays: Array<string> = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  public months: Array<string> = ["January","February","March","April","May", "June","July","August","September","October","November", "December"];
  public years: Array<number>;
  public yearsNotShowing:boolean;
  constructor() {
		this.days = [];
	}

  getYear(year){
    this.year = year;
    this.generateMonth();
  }

  changeYear(){
    this.yearsNotShowing = !this.yearsNotShowing;
  }

  getMonthText(monthNumber: number){
    this.currentMonth += monthNumber;
    if(this.currentMonth == 12){
      this.currentMonth = 0;
      this.year += 1;
    }
    else if(this.currentMonth == -1){
      this.currentMonth = 11;
      this.year -= 1;
    }
    this.month = this.months[this.currentMonth];
    this.generateMonth();
  }

  generateMonth(){
    this.days = [];
    //get the number of days in the month
    var numDays = new Date(this.year, this.currentMonth+1, 0).getDate();
    var numDaysLast = new Date(this.year, this.currentMonth, 0).getDate();

    //get the day of the week of the first day as a number
    var firstDay = new Date(this.year, this.currentMonth, 1).getDay();
    //current calculated day
    var currentDay;
    var currentDayNum;

    //get days before the current month starts
    if(firstDay != 0){
      var numExtra = firstDay-1;
      for(var x=numExtra; x >= 0; x--){
        var cDayLast = numDaysLast - x;
        if(this.currentMonth == 0){
          currentDay = new Date(this.year-1, 11, cDayLast);
          currentDayNum = currentDay.getDay();
        }
        else{
          currentDay = new Date(this.year, this.currentMonth-1, cDayLast);
          currentDayNum = currentDay.getDay();
        }
        var itsWeekday = this.weekdays[currentDayNum];
        //this.currentViewDays.push(cDayLast);
        this.days.push(new Day(cDayLast, false));
      }
    }

    //add the days of the month to the days array
    for ( var d = 1; d <= numDays; d++){
      //get the day of the week in number 0:Sun - 6:Sat
      currentDay = new Date(this.year, this.currentMonth, d);
      currentDayNum = currentDay.getDay();
      var itsWeekday = this.weekdays[currentDayNum];
      //this.currentViewDays.push(d);
      this.days.push(new Day(d, true));
    }

    var count = 1;
    var daysLeft = numDays + firstDay;
    for ( var y = daysLeft; y < 42; y++){
      if(this.currentMonth == 11){
        currentDay = new Date(this.year, 0, count);
        currentDayNum = currentDay.getDay();
      }
      else{
        currentDay = new Date(this.year, this.currentMonth+1, count);
        currentDayNum = currentDay.getDay();
      }
      var itsWeekday = this.weekdays[currentDayNum];
      //this.currentViewDays.push(count);
      this.days.push(new Day(count, false));
      count++;
    }
  }

  generateYears(middleYear){
      var startYear = middleYear - 10;
      for(var x = 0; x <= 20; x++){
        this.years.push(startYear+x);
      }
  }

  ngOnInit() {
    this.date = new Date();
    this.currentMonth = this.date.getMonth();
    this.month = this.months[this.currentMonth];
    this.year = this.date.getFullYear();
    this.years =[];
    this.yearsNotShowing = true;
    this.generateMonth();
    this.generateYears(this.year);
  }
}
