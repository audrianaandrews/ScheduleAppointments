import { Component, OnInit } from '@angular/core';
import { Appointment } from './appointment';
import { AppointmentService } from './appointment.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  appointments: Appointment[];
  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.appointments = this.appointmentService.getAppointments();
  }

}
