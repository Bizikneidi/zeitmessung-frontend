export enum StationCommands {
    // SERVER -> STATION
    StartMeasuring = 0, // Station should start measuring times
    StopMeasuring = 1, // Station should stop measuring times

    // STATION -> SERVER
    MeasuredStart = 2, // Message contains the start time
    MeasuredStop = 3 // Message contains a stop time
}

export enum AdminCommands {
    // SERVER -> ADMIN
    Status = 0, // Message contains the current time measurement status
    RunStart = 1, // Message contains the time and all runners
    MeasuredStop = 2, // Message contains a stop time
    RunEnd = 3, // The run has ended (data is null)

    // ADMIN -> SERVER
    Start = 4, // Admin has pressed the start button and server should start a race
    AssignTime = 5 // Admin assigned a time to a runner
}

export enum ViewerCommands {
    // SERVER -> VIEWER
    Status = 0, // Message contains the current time measurement status
    RunStart = 1, // Message contains the time and all runners
    RunnerFinished = 2, // Message contains a runner who finished the race
    RunEnd = 4, // The run has ended (data is null),
    Races = 5, // Message contains all races up to this point
    Runners = 6, // Message contains all racers for a race

    // VIEWER -> SERVER
    GetRunners = 7 // Viewer is requesting all racers to a race
}

export enum ParticipantCommands {
    //SERVER -> PARTICIPANT
    Races = 0, //A list of all races of the future, the participant can register for (data is list of races)

    //PARTICIPANT -> SERVER
    Register = 1 //A person wants to register. Message contains data to register as a participant
}

export class Message<Commands> { // Used to send Commands and Data between websockets
    public Command: Commands; // Command used to identify purpose of Message
    public Data: any; // The "Arguments" which come with the command
 }
