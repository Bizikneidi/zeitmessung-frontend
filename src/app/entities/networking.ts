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
    State = 0, // The state of the current race, data is the state
    AvailableRaces = 1, // All available races the admin can start, data is a list of races
    RaceStart = 2, // A race has started, data is a RaceStartDTO
    MeasuredStop = 3, // A participant has finished, data is the corresponding stop time
    RaceEnd = 4, // The race has ended, data is null

    // ADMIN -> SERVER
    Start = 5, // Admin has pressed the start button and server should start a race. data is the id of a race
    AssignTime = 6, // Admin assigned a time to a participant, data is an AssignmentDTO
    CreateRace = 7 // Admin created a race, data is a race
}

export enum ViewerCommands {
    // SERVER -> VIEWER
    Status = 0, // Message contains the current time measurement status
    RunStart = 1, // Message contains the time and all participants
    ParticipantFinished = 2, // Message contains a participant who finished the race
    RunEnd = 4, // The run has ended (data is null),
    Races = 5, // Message contains all races up to this point
    Participants = 6, // Message contains all racers for a race

    // VIEWER -> SERVER
    GetParticipants = 7 // Viewer is requesting all racers to a race
}

export enum ParticipantCommands {
    // SERVER -> PARTICIPANT
    Races = 0, // A list of all races of the future, the participant can register for (data is list of races)

    // PARTICIPANT -> SERVER
    Register = 1 // A person wants to register. Message contains data to register as a participant
}

export class Message<Commands> { // Used to send Commands and Data between websockets
    public Command: Commands; // Command used to identify purpose of Message
    public Data: any; // The "Arguments" which come with the command
}
