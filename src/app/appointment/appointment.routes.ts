import {Routes} from "@angular/router";
import {AppointmentFormComponent} from './appointment-form.component';

export const APPOINTMENT_ROUTES: Routes = [
  {path: '', redirectTo:"/", pathMatch: 'full' },
  {path: 'add-appointment', component: AppointmentFormComponent}
];
