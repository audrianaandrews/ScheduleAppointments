import { Component, Input } from '@angular/core';
import { Day } from './day';

@Component({
  selector: 'day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent {
  @Input() day: Day[];

  createAppointment(day: Day){
    console.log(day.dayNumber);
  }
}
