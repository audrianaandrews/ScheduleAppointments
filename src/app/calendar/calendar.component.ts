import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import {Appointment} from '../appointment/appointment';
import {AppointmentService} from '../appointment/appointment.service';
import {Day} from '../day/day';
import { Router } from '@angular/router';

import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit, OnDestroy{
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
  public appointments: Appointment[];
  public monthAppointments: Appointment[];
  public prevMonthsApp: Appointment[] = [];
  public currentMonthsApp: Appointment[] = [];
  public nextMonthsApp: Appointment[] = [];
  public currentDaysApp: Appointment[] = [];
  public hasApps: boolean = false;

  subscription:Subscription;
  constructor(private appointmentService: AppointmentService,
  private router: Router) {
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
      /*this.appointmentService.getAppointmentsByMonth(this.year, this.);*/
      let previousMonth: number;
      let previousYear: number;
      if(this.currentMonth == 0){
        previousMonth = 11;
        previousYear = this.year-1;
        this.prevMonthsApp = this.appointmentService.getAppointmentsByMonth(previousYear, this.months[previousMonth]);
      }
      else{
        previousMonth = this.currentMonth-1;
        previousYear = this.year;
        this.prevMonthsApp = this.appointmentService.getAppointmentsByMonth(previousYear, this.months[previousMonth]);
      }

      for(var x=numExtra; x >= 0; x--){
        var cDayLast = numDaysLast - x;

        currentDay = new Date(previousYear, previousMonth, cDayLast);
        currentDayNum = currentDay.getDay();

        var itsWeekday = this.weekdays[currentDayNum];
        //this.currentViewDays.push(cDayLast);

        for(let app = 0; app <  this.prevMonthsApp.length; app++){
          if(this.prevMonthsApp[app].dayNumber == cDayLast){
            this.currentDaysApp.push(this.prevMonthsApp[app]);
          }
        }
        if(this.currentDaysApp.length != 0){
          this.hasApps = true;
        }
        this.days.push(new Day(currentDay, cDayLast, false, this.currentDaysApp, this.hasApps));
        this.currentDaysApp = [];
        this.hasApps = false;
      }
    }


    this.currentMonthsApp = this.appointmentService.getAppointmentsByMonth(this.year, this.months[this.currentMonth]);
    //add the days of the month to the days array
    for ( var d = 1; d <= numDays; d++){
      //get the day of the week in number 0:Sun - 6:Sat
      currentDay = new Date(this.year, this.currentMonth, d);
      currentDayNum = currentDay.getDay();
      var itsWeekday = this.weekdays[currentDayNum];
      //this.currentViewDays.push(d);

      for(let app = 0; app <  this.currentMonthsApp.length; app++){
        if(this.currentMonthsApp[app].dayNumber == d){
          this.currentDaysApp.push(this.currentMonthsApp[app]);
        }
      }
      if(this.currentDaysApp.length != 0){
        this.hasApps = true;
      }
      this.days.push(new Day(currentDay, d, true, this.currentDaysApp, this.hasApps));
      this.currentDaysApp = [];
      this.hasApps = false;
    }

    //get first days of next month
    var count = 1;
    var daysLeft = numDays + firstDay;

    let nextMonth: number;
    let nextYear: number;

    if(this.currentMonth == 11){
      nextMonth = 0;
      nextYear= this.year;
      this.nextMonthsApp = this.appointmentService.getAppointmentsByMonth(nextYear, this.months[nextMonth]);
    }
    else{
      nextMonth = this.currentMonth+1;
      nextYear= this.year;
      this.nextMonthsApp = this.appointmentService.getAppointmentsByMonth(nextYear, this.months[nextMonth]);
    }

    for ( var y = daysLeft; y < 42; y++){
      currentDay = new Date(nextYear, nextMonth, count);
      currentDayNum = currentDay.getDay();

      var itsWeekday = this.weekdays[currentDayNum];
      //this.currentViewDays.push(count);

      for(let app = 0; app <  this.nextMonthsApp.length; app++){
        if(this.nextMonthsApp[app].dayNumber == count){
          this.currentDaysApp.push(this.nextMonthsApp[app]);
        }
      }
      if(this.currentDaysApp.length != 0){
        this.hasApps = true;
      }
      this.days.push(new Day(currentDay,count, false, this.currentDaysApp, this.hasApps));
      this.currentDaysApp = [];
      this.hasApps = false;
      count++;
    }
  }

  generateYears(middleYear){
      var startYear = middleYear - 10;
      for(var x = 0; x <= 20; x++){
        this.years.push(startYear+x);
      }
  }

  backToCurrent(){
    var currentDate = new Date();
    let dayForLink = currentDate.getDate();
    this.currentMonth = currentDate.getMonth();
    this.month = this.months[this.currentMonth];
    this.year = currentDate.getFullYear();

    let dateForLink = new Date(this.year, currentDate.getMonth(), dayForLink);
    var currentDateId = dateForLink.toISOString().split('T')[0];
    this.generateMonth();
    this.generateYears(this.year);

    this.router.navigate([`/list/${currentDateId}`]);
  }

  ngOnInit() {
    this.date = new Date();
    this.currentMonth = this.date.getMonth();
    this.month = this.months[this.currentMonth];
    this.year = this.date.getFullYear();
    this.years =[];
    this.yearsNotShowing = true;
    this.appointments = this.appointmentService.getAppointments();
    this.generateMonth();
    this.generateYears(this.year);

    this.subscription = this.appointmentService.appointmentsChanged$.subscribe(
      appointments => {this.appointments = appointments;
      this.generateMonth();}
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
