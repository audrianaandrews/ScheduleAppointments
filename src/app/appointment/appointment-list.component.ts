import { Component, OnInit, OnDestroy, Input,Output, EventEmitter } from '@angular/core';
import { Appointment } from './appointment';
import { AppointmentComponent } from './appointment.component';
import { AppointmentService } from './appointment.service';
import { Router, ActivatedRoute } from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Rx';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit, OnDestroy {
  appointments: Appointment[] = [];
  private fullDate: string;
  public title: string = "All";
  public months: Array<string> = ["January","February","March","April","May", "June","July","August","September","October","November", "December"];
  subscription:Subscription;
  subscriptionApp:Subscription;

  constructor(private appointmentService: AppointmentService,
  private router: Router,
  private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.subscriptionApp = this.appointmentService.appointmentsChanged$.subscribe(
      appointments => (this.appointments = appointments)
    );

    this.subscription = this.route.params.subscribe(
      //plus converts it to a number
      (params: any) => {
        if(params.hasOwnProperty('id')){
          this.fullDate = params['id'];

          let dateArray = this.fullDate.split("-");

          this.appointments = this.appointmentService.getAppointmentsByDay(+dateArray[0], +dateArray[1]-1, +dateArray[2]);
          for (let app = 0; app < this.appointments.length; app++){
            this.appointments[app].fullList = false;
          }

          this.title = this.months[+dateArray[1]-1]  + " " + dateArray[2] +", "+dateArray[0];
        } else{
          this.appointments = this.appointmentService.getAppointments();
          for (let app = 0; app < this.appointments.length; app++){
            this.appointments[app].fullList = true;
          }
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscriptionApp.unsubscribe();
  }

  editApp(appointment:Appointment, index: number){
    this.router.navigate([`/add-appointment/${index}`]);
  }
  deleteApp(appointment:Appointment){
    this.appointmentService.deleteAppointment(appointment);
    let dateArray = this.fullDate.split("-");
    this.appointments = this.appointmentService.getAppointmentsByDay(+dateArray[0], +dateArray[1]-1, +dateArray[2]);
    this.router.navigate([`/list/${this.fullDate}`]);
  }
}
