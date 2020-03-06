export enum Discipline {
    RoadCycling,
    MountainBiking,
    Running,
    XcSkiing,
}

export enum MountainBikeEventType {
    XCM,
    XCO,
    XCE,
    StageRace,
}

export enum RunningEventType {
    Marathon,
    Halfmarathon,
    StreetRace,
    Ultramarathon,
    CrossRace,
}

export enum RoadCyclingEventType {
    TimeTrial,
    StageRace,
    SingleDay,
}

export interface KeyLabel {
    [key: string]: string;
}


export const DISCPLINES: KeyLabel = {
    [Discipline.MountainBiking]: 'Kolarstwo górskie',
    [Discipline.RoadCycling]: 'Kolarstwo szosowe',
    [Discipline.Running]: 'Bieganie',
    [Discipline.XcSkiing]: 'Narciarstwo biegowe',
}