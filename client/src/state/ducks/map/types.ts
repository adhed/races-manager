import { SportEvent } from "../../../shared/models/sport-event";
import { MarkerCoordinates } from "../../../shared/models/map";

export interface MapState {
    readonly selectedEvent: SportEvent | null;
    readonly mapPosition: MarkerCoordinates;
    readonly zoom: number;
}

export const MapActionTypes = {
    SELECT_EVENT: "@@map/SELECT_EVENT",
    SET_MAP_POSITIOM: "@@map/SET_MAP_POSITION",
    SET_ZOOM: "@@map/SET_ZOOM",
};
