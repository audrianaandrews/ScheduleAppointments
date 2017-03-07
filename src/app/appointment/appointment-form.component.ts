import {Component, NgModule, OnInit,OnDestroy, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Appointment} from './appointment';
import {AppointmentService} from './appointment.service';
import {Subscription} from 'rxjs/Rx';

import {Observable} from 'rxjs/Rx';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray  } from '@angular/forms';


@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit, OnDestroy{
  //@Input() appointment: Appointment;
  apointments: Appointment[];
  appointmentForm: FormGroup;
  private appointment: Appointment;
  private appointmentIndex: number;
  private isNew = true;
  private subscription: Subscription;
  private appointmentName = '';
  private appointmentDate = '';
  private appointmentTime = '';
  private appointmentAmpm = 'am';
  private routeLink = this.route;
  ampm = ["am", "pm"];

  constructor(private appointmentService: AppointmentService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(){
    this.subscription = this.route.parent.params.subscribe(
      (params: any) => {
        if(params.hasOwnProperty('id')){
          console.log(this.route);
          if(params['id'].search('-') != -1){
            this.appointmentDate = params['id'];
          }
          this.buildForm();
        }
      }
    );

      this.subscription = this.route.params.subscribe(
      //plus converts it to a number
      (params: any) => {
        if(params.hasOwnProperty('id')){
          console.log(this.route);
          if(params['id'].search('-') != -1){
            this.appointmentDate = params['id'];
          }
          else{
            this.appointmentIndex = +params['id'];
            this.isNew = false;
          }

          this.appointment = this.appointmentService.getAppointment(this.appointmentIndex);
        } else{
          this.isNew = true;
          this.appointment = null;
        }
        this.buildForm();
      }
    );
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  buildForm(){


    if(!this.isNew){
      this.appointmentName = this.appointment.name;
      this.appointmentDate = this.appointment.date.toISOString().split('T')[0];
      this.appointmentTime = this.appointment.time;
      this.appointmentAmpm = this.appointment.ampm;
    }
    this.appointmentForm = this.formBuilder.group({
      'appointmentName': [this.appointmentName, Validators.required],
      'date': [this.appointmentDate, Validators.required],
      'time': [this.appointmentTime, [Validators.required, Validators.pattern("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$")]],
      'ampm': [this.appointmentAmpm, Validators.required]
    });
  }

  onSubmit(){
    let appointmentName = (<FormArray>this.appointmentForm.get('appointmentName')).value;
    let dateString = (<FormArray>this.appointmentForm.get('date')).value;
    let time = (<FormArray>this.appointmentForm.get('time')).value;
    let ampm = (<FormArray>this.appointmentForm.get('ampm')).value;

    let dateArray = dateString.split("-");
    let date = new Date(dateArray[0], dateArray[1]-1, dateArray[2]);

    let appointmentIndex = this.appointmentService.getAppointments().length;

    if(this.isNew){
      this.appointmentService.addAppointment(new Appointment(date, appointmentName, time, ampm, appointmentIndex));
    }
    else{
      this.appointmentService.editAppointment(new Appointment(date, appointmentName, time, ampm, this.appointmentIndex), this.appointmentIndex);
    }
    this.navigateBack();
  }

  onCancel(){
      this.navigateBack();
  }

  onDelete(){
    if(!this.isNew){
      this.appointmentService.deleteAppointment(this.appointment);
      this.navigateBack();
    }
  }

  private navigateBack() {
    this.router.navigate(['../']);
  }

}
