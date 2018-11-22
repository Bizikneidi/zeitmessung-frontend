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
		let hours = 0;
		let minutes = 0;
		let seconds = 0;

		if(timeInMs > 1000 * 60 * 60) {
			hours = timeInMs / (1000 * 60 * 60);
			timeInMs = timeInMs % (1000 * 60 * 60);
		}

		if(timeInMs > 1000 * 60) {
			minutes = timeInMs / (1000 * 60);
			timeInMs = timeInMs % (1000 * 60);
		}
	  
		let hoursStr = hours === 0 ? '00' : hours < 10 ? '0' + hours : hours;
		let minutesStr = minutes === 0 ? '00' : minutes < 10 ? '0' + minutes : minutes;
		let secondsStr = seconds === 0 ? '00' : seconds < 10 ? '0' + seconds : seconds;

		if(timeInMs < 10)
			return hoursStr + delim + minutesStr + delim + secondsStr + "/0" + timeInMs;
		return hoursStr + delim + minutesStr + delim + secondsStr + "/" + timeInMs;
	}
}
