import {Routes, RouterModule } from '@angular/router';
import {AppointmentListComponent} from './appointment/appointment-list.component';
import {AppointmentFormComponent} from './appointment/appointment-form.component';
import {CalendarComponent} from './calendar/calendar.component';
import {APPOINTMENT_ROUTES} from "./appointment/appointment.routes";

const APP_ROUTES: Routes=[
  {path: 'add-appointment/:id', component: AppointmentFormComponent},
  {path: 'add-appointment', component: AppointmentFormComponent},
  {path: 'calendar', component: CalendarComponent },
  {path: 'list', component: AppointmentListComponent },
  {path: '', redirectTo: '/list', pathMatch: 'full' },
  //Every route not recognized should get redirected to
  {path: '**', redirectTo: '/list', pathMatch: 'full' }
];

export const routes = RouterModule.forRoot(APP_ROUTES);
