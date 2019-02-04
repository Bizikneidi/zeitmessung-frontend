/**
 *The possible states of the startrace
 *
 * @export
 * @enum {number}
 */
export enum RaceManagerState {
    /**
     *The racemanager is theoretically ready to start a startrace (A station has connected)
     */
    Ready = 0,
    /**
     *The admin requested the start of a startrace (The admin has pressed start)
     */
    MeasurementRequested = 1,
    /**
     *A startrace is in progress
     */
    Measuring = 2,
    /**
     *The racemanager is not ready and nobody can request or start a startrace (no station is connected)
     */
    Disabled = 3
}
