import { Component } from '@angular/core';
import {CalendarComponent} from "./calendar.component";
import { AppointmentFormComponent } from './appointment/appointment-form.component';
import { AppointmentListComponent } from './appointment/appointment-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Schedule Appointments';
}
