import {Routes} from "@angular/router";
import {AppointmentFormComponent} from './appointment-form.component';

export const APPOINTMENT_ROUTES: Routes = [
  {path: '', component: AppointmentFormComponent},
  {path: ':id', component: AppointmentFormComponent}
];
