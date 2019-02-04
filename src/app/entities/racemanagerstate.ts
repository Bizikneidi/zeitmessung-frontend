/**
 *The possible states of the race
 *
 * @export
 * @enum {number}
 */
export enum RaceManagerState {
    /**
     *The racemanager is theoretically ready to start a race (A station has connected)
     */
    Ready = 0,
    /**
     *The admin requested the start of a race (The admin has pressed start)
     */
    MeasurementRequested = 1,
    /**
     *A race is in progress
     */
    Measuring = 2,
    /**
     *The racemanager is not ready and nobody can request or start a race (no station is connected)
     */
    Disabled = 3
}
