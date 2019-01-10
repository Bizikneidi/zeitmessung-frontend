import { Participant } from './participant';

export class RunStart {
    public CurrentTime: number; // The current time of the station
    public Participants: Array<Participant>; // All participants participating in this event
    public StartTime: number; // The start time of the station
}
