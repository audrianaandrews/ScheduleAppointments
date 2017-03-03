import { Component, Input } from '@angular/core';
import { Day } from './day';
import { Appointment } from '../appointment/appointment';
import { AppointmentComponent } from '../appointment/appointment.component';

@Component({
  selector: 'day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent {
  @Input() day: Day;
  @Input() appointment: Appointment;
}
