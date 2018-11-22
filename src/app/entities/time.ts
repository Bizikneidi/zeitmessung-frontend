export class Time {
    public End: number;
    public Start: number;

    constructor(end: number, start: number) {
        this.End = end;
        this.Start = start;
	}
	
	toString() {
		let timeInMs = this.End - this.Start;
		let delim = ":";
		let hours = Math.ceil(timeInMs / (1000 * 60 * 60) % 60);
		let minutes = Math.floor(timeInMs / (1000 * 60) % 60);
		let seconds = Math.floor(timeInMs / 1000 % 60);
	  
		let hoursStr = hours < 10 ? '0' + hours : hours;
		let minutesStr = minutes < 10 ? '0' + minutes : minutes;
		let secondsStr = seconds < 10 ? '0' + seconds : seconds;
		return hoursStr + delim + minutesStr + delim + secondsStr;
	}
}
