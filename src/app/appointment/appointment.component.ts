import { Component, Input, EventEmitter,Output} from '@angular/core';
import {Appointment} from "./appointment";
import {AppointmentService} from "./appointment.service";


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent{
  @Input() appointment : Appointment;
  @Input() appointmentId : number
  @Output() editAppClicked = new EventEmitter<Appointment>();
  constructor(private appointmentService: AppointmentService) { }

  deleteClicked(appointment){
    this.appointmentService.deleteAppointment(appointment);
  }
  editClicked(){
    this.editAppClicked.emit(this.appointment);
  }
}
