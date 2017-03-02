import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import {Appointment} from "./appointment";

@Injectable()
export class AppointmentService {

  private appointments: Appointment[] = [
    new Appointment(new Date(), 'Get hair done', '9:00', 'am')
  ];

  private appointmentsChangedSource = new BehaviorSubject<Appointment[]>(this.appointments);
  appointmentsChanged$ = this.appointmentsChangedSource.asObservable();

  constructor() { }

  addAppointment(appointment: Appointment){
    this.appointments.push(appointment);
    this.appointmentsChangedSource.next(this.appointments);
  }

  getAppointments(){
    return this.appointments;
  }

  deleteAppointment(appointment: Appointment){
    this.appointments.splice(this.appointments.indexOf(appointment), 1);
    this.appointmentsChangedSource.next(this.appointments);
  }

}
