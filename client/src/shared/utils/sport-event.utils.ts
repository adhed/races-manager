import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { Discipline } from "../models/disciplines";
import { faRunning, faBiking, faSkiingNordic } from "@fortawesome/free-solid-svg-icons";

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
