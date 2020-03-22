import { SportEvent } from "../../../shared/models/sport-event";

export interface MapState {
    readonly selectedEvent: SportEvent | null;
}

export const MapActionTypes = {
	SELECT_EVENT: "@@map/SELECT_EVENT",
};
