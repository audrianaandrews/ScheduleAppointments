import { Injectable } from '@angular/core';
import {Appointment} from "./appointment";

@Injectable()
export class AppointmentService {

  private appointments: Appointment[] = [
    new Appointment(new Date(), 'Get hair done', '9:00', 'am')
  ];
  constructor() { }

  addAppointment(appointment){

  }

  getAppointments(){
    return this.appointments;
  }

}
