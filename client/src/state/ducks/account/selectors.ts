import { ApplicationState } from '../index';
import { SportEvent } from '../../../shared/models/sport-event';
import { isEventFavourite } from '../../../shared/utils/sport-event.utils';
import { sortByDate, getYesterday } from '../../../shared/utils';

export const getUid = (state: ApplicationState) => state.account.user?.uid;

export const getIsAdmin = (state: ApplicationState) => state.account.details?.isAdmin;

export const getAccount = (state: ApplicationState) => state.account;

export const getSelectedEvent = (selectedEvent: SportEvent | null, favEvents: string[]): SportEvent | null => {
    return selectedEvent ? {
        ...selectedEvent,
        isFavourite: isEventFavourite(selectedEvent, favEvents),
    } : null;
};

export const getFavouriteEvents = (events: SportEvent[] = [], favEvents: string[]): SportEvent[] => {
    return events
        .filter((event: SportEvent) => isEventFavourite(event, favEvents))
        .sort((event1: SportEvent, event2: SportEvent) => sortByDate(event1.date, event2.date))
        .reverse();
};

export const getPastSportEvents = (events: SportEvent[] = [], favEvents: string[]): SportEvent[] => {
    return getFavouriteEvents(events, favEvents)
        .filter((event: SportEvent) => new Date(event.date) < getYesterday());
};

export const getUpcomingSportEvents = (events: SportEvent[] = [], favEvents: string[]): SportEvent[] => {
    return getFavouriteEvents(events, favEvents)
        .filter((event: SportEvent) => new Date(event.date) >= getYesterday());
};
