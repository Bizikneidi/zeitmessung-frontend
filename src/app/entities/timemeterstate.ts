export enum TimeMeterState {
    Ready, // The time meter is theoretically ready to start a measurement
    MeasurementRequested, // Something has requested the time meter to start a measurement
    Measuring, // The time meter is currently measuring a time
    Disabled // The time meter can not start a measurement and nobody can request one
}
