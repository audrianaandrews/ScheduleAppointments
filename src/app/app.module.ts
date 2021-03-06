import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {CalendarComponent} from "./calendar/calendar.component";
import {DayComponent} from "./day/day.component";
import { AppointmentComponent } from './appointment/appointment.component';
import { AppointmentService } from './appointment/appointment.service';
import { AppointmentFormComponent } from './appointment/appointment-form.component';
import { AppointmentListComponent } from './appointment/appointment-list.component';
import {routes} from "./app.routes";

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    DayComponent,
    AppointmentComponent,
    AppointmentFormComponent,
    AppointmentListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule, routes
  ],
  providers: [AppointmentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
