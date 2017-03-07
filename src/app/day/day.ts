import {Appointment} from "../appointment/appointment";

export class Day {
	public dayNumber: number;
	public date: Date;
	public dateISO: string;
	public inCurrentMonth: boolean;
	public hasApps: boolean;
	public appointments: Appointment[];

	constructor(date, dayNumber, inCurrentMonth, appointments, hasApps) {
		this.inCurrentMonth = inCurrentMonth;
		this.dayNumber = dayNumber;
		this.date = date;
		this.appointments = appointments;
		this.hasApps = hasApps;
		this.dateISO = date.toISOString().split('T')[0];
	}
}
