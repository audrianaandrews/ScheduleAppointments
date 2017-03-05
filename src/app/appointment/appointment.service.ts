import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import {Appointment} from "./appointment";

@Injectable()
export class AppointmentService {

  private appointments: Appointment[] = [
    new Appointment(new Date(2017,1,28), 'Bills Due', '5:00', 'pm', 0),
    new Appointment(new Date(), 'Get hair done', '9:00', 'am', 1),
    new Appointment(new Date(2017,3,5), 'Babysit', '4:00', 'pm', 2)
  ];

  private appointmentsChangedSource = new BehaviorSubject<Appointment[]>(this.appointments);
  appointmentsChanged$ = this.appointmentsChangedSource.asObservable();

  constructor() { }

  addAppointment(appointment: Appointment){
    this.appointments.push(appointment);
    this.appointmentsChangedSource.next(this.appointments);
  }

  getAppointment(index){
    return this.appointments[index];
  }

  getAppointments(){
    return this.appointments;
  }

  deleteAppointment(appointment: Appointment){
    this.appointments.splice(this.appointments.indexOf(appointment), 1);
    this.appointmentsChangedSource.next(this.appointments);
  }

  editAppointment(appointment: Appointment, index:number){
    this.appointments[index] = appointment;
    this.appointmentsChangedSource.next(this.appointments);
  }

  getAppointmentsByMonth(year:number, month: string){
    let thisMonthsApp: Appointment[] = [];
    for (let a=0; a < this.appointments.length; a++){
      if(this.appointments[a].year == year){
        if(this.appointments[a].month == month){
          thisMonthsApp.push(this.appointments[a]);
        }
      }
    }
    return thisMonthsApp;
  }

}
