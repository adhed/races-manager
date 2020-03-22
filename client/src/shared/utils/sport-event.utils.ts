import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Event } from 'react-big-calendar';
import { Discipline } from "../models/disciplines";
import { faRunning, faBiking, faSkiingNordic } from "@fortawesome/free-solid-svg-icons";
import { SportEvent } from "../models/sport-event";

export const getDisciplineIcon = (discipline: string): IconDefinition => {
    if (discipline === Discipline.Running) {
        return faRunning;
    }
    if (discipline === Discipline.MountainBiking) {
        return faBiking;

    }
    if (discipline === Discipline.RoadCycling) {
        return faBiking;

    }
    if (discipline === Discipline.XcSkiing) {
        return faSkiingNordic;
    }

    return faRunning;
};

export const mapSportEventsToCalendar = (sportEvents: SportEvent[]): Event[] => {
    return sportEvents.map((event: SportEvent) => ({
        allDay: true,
        title: event.name,
        start: event.date,
        end: event.date,
        id: event._id
    }));
}