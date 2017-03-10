import { Component, Input, EventEmitter,Output} from '@angular/core';
import {Appointment} from "./appointment";
import {AppointmentService} from "./appointment.service";
import { Router, ActivatedRoute } from '@angular/router';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent{
  @Input() appointment : Appointment;
  @Input() appointmentId : number
  @Output() editAppClicked = new EventEmitter<Appointment>();
  @Output() deleteAppClicked = new EventEmitter<Appointment>();
  routeId: string;
  subscription:Subscription;

  constructor(private appointmentService: AppointmentService) { }

  deleteClicked(appointment){
    this.deleteAppClicked.emit(this.appointment);

  }
  editClicked(){
    this.editAppClicked.emit(this.appointment);
  }
}
