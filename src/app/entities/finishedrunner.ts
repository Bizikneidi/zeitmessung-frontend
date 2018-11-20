// This entity contains data that is sent when a runner finishes the race.
// Used for adding the runner to the result-list
export class FinishedRunner {
    public Starter: number; // Startnumber of the participant that finished the race
    public Time: number; // Needed run-time
}