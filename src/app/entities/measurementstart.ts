import { Runner } from "./runnner";

// entity to store the start and current time for state - and measurment start messages
// Can be used by viewers to calculate time differences and run local timer
export class MeasurementStart {
    public CurrentTime: number; // The current time of the station
    public StartTime: number; // The start time of the station
    public Runners: Array<Runner>; // All runners participating in this event
}
