import { Component, OnInit, OnDestroy, Input,Output, EventEmitter } from '@angular/core';
import { Appointment } from './appointment';
import { AppointmentComponent } from './appointment.component';
import { AppointmentService } from './appointment.service';
import { Router } from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit, OnDestroy {
  appointments: Appointment[] = [];

  subscription:Subscription;

  constructor(private appointmentService: AppointmentService,
  private router: Router) {
  }

  ngOnInit() {
    this.appointments = this.appointmentService.getAppointments();
    this.subscription = this.appointmentService.appointmentsChanged$.subscribe(
      appointments => (this.appointments = appointments)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  editApp(appointment:Appointment, index: number){
    this.router.navigate([`/add-appointment/${index}`]);
  }
}
