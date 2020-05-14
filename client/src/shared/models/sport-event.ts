import { MarkerCoordinates } from "./map";

export interface SportEvent {
    _id?: string;
    author?: string;
    name: string;
    serie: string;
    date: Date;
    discipline: string;
    place: string;
    link: string;
    type: string;
    coordinates: MarkerCoordinates,
    description: string;
    isActive?: boolean;
    isFavourite?: boolean;
}

export interface CalendarSportEvent {
    
}
