import {Appointment} from "../appointment/appointment";

export class Day {
	public dayNumber: number;
	public inCurrentMonth: boolean;
	public appointments: Appointment[];

	constructor(dayNumber, inCurrentMonth, appointments) {
		this.inCurrentMonth = inCurrentMonth;
		this.dayNumber = dayNumber;
		this.appointments = appointments;
	}
}
