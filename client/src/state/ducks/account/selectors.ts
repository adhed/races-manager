import { ApplicationState } from '../index';
import { SportEvent } from '../../../shared/models/sport-event';
import { isEventFavourite } from '../../../shared/utils/sport-event.utils';
import { sortByDate } from '../../../shared/utils';

export const getUid = (state: ApplicationState) => state.account.user?.uid;

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
