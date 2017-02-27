export class Day {
	public dayNumber: number;
	public inCurrentMonth: boolean;
	public appointments: any[];

	constructor(dayNumber, inCurrentMonth) {
		this.inCurrentMonth = inCurrentMonth;
		this.dayNumber = dayNumber;
		this.appointments = [];
	}
}
