export enum RaceManagerState {
    Ready = 0, // The time meter is theoretically ready to start a measurement
    MeasurementRequested = 1, // Something has requested the time meter to start a measurement
    Measuring = 2, // The time meter is currently measuring a time
    Disabled = 3// The time meter can not start a measurement and nobody can request one
}
