import { Runner } from "./runner";

export class RunStartDTO {
    public CurrentTime: number; // The current time of the station
    public Runners: Array<Runner>; // All runners participating in this event
    public StartTime: number; // The start time of the station
}
