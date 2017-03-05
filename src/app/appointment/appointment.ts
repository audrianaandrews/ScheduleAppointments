export class Appointment {
	public year: number;
	public month: string;
	public dayNumber: number;
	public name: string;
	public time: string;
	public ampm: string;
	public months: Array<string> = ["January","February","March","April","May", "June","July","August","September","October","November", "December"];
	public index: number;
	public date: Date;

	constructor(date: Date, name, time, ampm, index) {
		this.date = date;
		this.year = date.getFullYear();
    this.month = this.months[date.getMonth()];
		this.dayNumber = date.getDate();
    this.name = name;
		this.time = time;
		this.ampm = ampm;
		this.index = index;
	}
}
