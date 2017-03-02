import {Component, NgModule, Input, Output, EventEmitter} from '@angular/core';
import {Appointment} from './appointment';
import {AppointmentService} from './appointment.service';

import {Observable} from 'rxjs/Rx';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray  } from '@angular/forms';


@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent{
  @Input() appointment: Appointment;
  appointmentForm: FormGroup;
  ampm = ["am", "pm"];

  constructor(private appointmentService: AppointmentService,
              private formBuilder: FormBuilder) {

      this.appointmentForm = formBuilder.group({
        'appointmentName': ['', Validators.required],
        'date': ['', Validators.required],
        'time': ['', [Validators.required, Validators.pattern("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$")]],
        'ampm': ['am', Validators.required]
      });
  }

  onSubmit(){
    let appointmentName = (<FormArray>this.appointmentForm.get('appointmentName')).value;
    let dateString = (<FormArray>this.appointmentForm.get('date')).value;
    let time = (<FormArray>this.appointmentForm.get('time')).value;
    let ampm = (<FormArray>this.appointmentForm.get('ampm')).value;

    let dateArray = dateString.split("-");
    let date = new Date(dateArray[0], dateArray[1], dateArray[2]);

    this.appointmentService.addAppointment(new Appointment(date, appointmentName, time, ampm));
  }
}
