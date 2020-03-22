import { action } from 'typesafe-actions';
import { MapActionTypes } from "./types";
import { SportEvent } from "../../../shared/models/sport-event";

export const selectEvent = (selectedEvent: SportEvent | null) => action(MapActionTypes.SELECT_EVENT, selectedEvent);