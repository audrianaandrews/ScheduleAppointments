import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) {
  }

  editApp(appointment:Appointment, index: number){
    this.router.navigate([`/add-appointment/${index}`]);
  }

  loadList(dateString: string){
    this.router.navigate([`/list/${dateString}`]);
  }
}
