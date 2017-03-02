import { Component, OnInit, OnDestroy } from '@angular/core';
import { Appointment } from './appointment';
import { AppointmentService } from './appointment.service';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit, OnDestroy {
  appointments: Appointment[] =[];

  subscription:Subscription;
  constructor(private appointmentService: AppointmentService) {
  }

  ngOnInit() {
    this.appointments = this.appointmentService.getAppointments();
    this.subscription = this.appointmentService.appointmentsChanged$.subscribe(
      appointments => {this.appointments = appointments;
      console.log(appointments);}
    );
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteClicked(appointment){
    this.appointmentService.deleteAppointment(appointment);
  }

}
