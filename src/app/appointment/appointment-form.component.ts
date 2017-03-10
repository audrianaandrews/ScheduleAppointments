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
  appointments: Appointment[];
  appointmentForm: FormGroup;
  private appointment: Appointment;
  private appointmentIndex: number;
  private isNew = true;
  private innerRoute = false;
  private subscription: Subscription;
  private appointmentName = '';
  private appointmentDate = '';
  private appointmentTime = '';
  private appointmentAmpm = 'am';
  private routeLink = this.route;
  ampm = ["am", "pm"];
  title = "Add";

  constructor(private appointmentService: AppointmentService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(){
    this.subscription = this.route.parent.params.subscribe(
      (params: any) => {
        if(params.hasOwnProperty('id')){
          if(params['id'].search('-') != -1){
            this.appointmentDate = params['id'];
            this.innerRoute = true;
            this.title = "Add";
          }
          this.buildForm();
        }
      }
    );

      this.subscription = this.route.params.subscribe(
      //plus converts it to a number
      (params: any) => {
        if(params.hasOwnProperty('id')){
            this.appointmentIndex = +params['id'];
            this.isNew = false;
            this.title = "Edit";
            this.innerRoute = false;

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
      let dateArray = this.appointment.date.toISOString().split('T')[0].split("-");
      let currentDate = new Date().toISOString().split('T')[0];
      if(this.isNew == false){
          if(this.appointment.date.toISOString().split('T')[0] == currentDate)
            if((+dateArray[2]-1).toString().length == 1 )
              this.appointmentDate = dateArray[0] + "-" + dateArray[1] + "-0" +(+dateArray[2]-1);
            else
              this.appointmentDate = dateArray[0] + "-" + dateArray[1] + "-" +(+dateArray[2]-1);
          else
            this.appointmentDate = dateArray[0] + "-" + dateArray[1] + "-" +dateArray[2];

          console.log(this.appointmentDate);
      }
      else{
        if((+dateArray[2]-1).toString().length == 1 )
          this.appointmentDate = dateArray[0] + "-" + dateArray[1] + "-0" +(+dateArray[2]-1);
        else
          this.appointmentDate = dateArray[0] + "-" + dateArray[1] + "-" +(+dateArray[2]-1);
      }

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
    }
    this.navigateBack();
  }

  private navigateBack() {
    if(!this.isNew){
      /*let dateArray = this.appointmentDate.split("-");
      let routeId = dateArray[0] + "-" + (+dateArray[1]-1) + "-" +dateArray[2];*/
      this.router.navigate([`/list/${this.appointmentDate}`]);
    }
    else if(this.innerRoute){
      this.router.navigate([`/list/${this.appointmentDate}`]);
      let dateArray = this.appointmentDate.split("-");
      this.appointments = this.appointmentService.getAppointmentsByDay(+dateArray[0], +dateArray[1]-1, +dateArray[2]);

    }
    else{
      this.router.navigate([`/list`]);
    }
  }

}
