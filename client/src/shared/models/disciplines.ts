export enum Discipline {
    RoadCycling = 'road-cycling',
    MountainBiking = 'mtb',
    Running = 'running',
    XcSkiing = 'xcskiing',
}

export enum MountainBikeEventType {
    XCM = 'xcm',
    XCO = 'xco',
    XCE = 'xce',
    StageRace = 'mtb-stage-race',
    TimeTrial = 'time-trial'
}

export enum RunningEventType {
    Marathon = 'run-marathon',
    Halfmarathon = 'halfmarathon',
    StreetRace = 'run-stage-race',
    Ultramarathon = 'run-ultra-marathon',
    CrossRace = 'cross-race',
}

export enum RoadCyclingEventType {
    TimeTrial = 'road-time-trial',
    StageRace = 'road-stage-race',
    SingleDay = 'road-single-day',
}

export enum CrossCountrySkiingEventType {
    TimeTrial = 'xc-time-trial',
    MassStart = 'xc-mass-start',
    Marathon = 'xc-marathon',
    Ultramarathon = 'xc-ultra-marathon',
}

export interface KeyLabel {
    [key: string]: string;
}

export const DISCPLINES_NAMES: KeyLabel = {
    [Discipline.MountainBiking]: 'Kolarstwo górskie',
    [Discipline.RoadCycling]: 'Kolarstwo szosowe',
    [Discipline.Running]: 'Bieganie',
    [Discipline.XcSkiing]: 'Narciarstwo biegowe',
}

export const DISCIPLINES_TYPES_NAMES: KeyLabel = {
    [MountainBikeEventType.XCM]: 'Maraton',
    [MountainBikeEventType.XCO]: 'XCO',
    [MountainBikeEventType.XCE]: 'Eliminator',
    [MountainBikeEventType.StageRace]: 'Wyścig etapowy',
    [MountainBikeEventType.TimeTrial]: 'Czasówka',
    [RoadCyclingEventType.SingleDay]: 'Wyścig jednodniowy',
    [RoadCyclingEventType.TimeTrial]: 'Czasówka',
    [RoadCyclingEventType.StageRace]: 'Wyścig etapowy',
    [RunningEventType.CrossRace]: 'Cross',
    [RunningEventType.Halfmarathon]: 'Półmaraton',
    [RunningEventType.Marathon]: 'Maraton',
    [RunningEventType.Ultramarathon]: 'Ultramaraton',
    [RunningEventType.StreetRace]: 'Wyścig miejski',
    [CrossCountrySkiingEventType.TimeTrial]: 'Czasówka',
    [CrossCountrySkiingEventType.Marathon]: 'Maraton',
    [CrossCountrySkiingEventType.MassStart]: 'Inny wyścig ze startu wspólnego',
    [CrossCountrySkiingEventType.Ultramarathon]: 'Ultramaraton',
}

export const DISCIPLINES_TYPES = {
    [Discipline.MountainBiking]: [MountainBikeEventType.XCM, MountainBikeEventType.XCO, MountainBikeEventType.XCE, MountainBikeEventType.TimeTrial, MountainBikeEventType.StageRace],
    [Discipline.RoadCycling]: [RoadCyclingEventType.SingleDay, RoadCyclingEventType.StageRace, RoadCyclingEventType.TimeTrial],
    [Discipline.Running]: [RunningEventType.Halfmarathon, RunningEventType.Marathon, RunningEventType.Ultramarathon, RunningEventType.StreetRace, RunningEventType.CrossRace],
    [Discipline.XcSkiing]: [CrossCountrySkiingEventType.Marathon, CrossCountrySkiingEventType.Ultramarathon, CrossCountrySkiingEventType.TimeTrial,  CrossCountrySkiingEventType.MassStart],
}