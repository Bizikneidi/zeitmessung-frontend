export class Message<Commands> { // Used to send Commands and Data between websockets
    public Command: Commands; // Command used to identify purpose of Message
    public Data: any; // The "Arguments" which come with the command
}

export enum ViewerCommands {
    Status = 0, // Message contains the current time measurement status
    MeasuredStart = 1, // Broadcast where message contains the start time
    MeasuredEnd = 2 // Broadcast where message contains the stop time
}

export enum ParticipantCommands {
    Register = 0 // Message contains data to register as a participant
}

export enum AdminCommands {
    Status = 0, // Message contains the current time measurement status
    Start = 1 // Admin has pressed the start button and server should start a measurement
}
