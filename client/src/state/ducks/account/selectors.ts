import { ApplicationState } from '../index';
import { SportEvent } from '../../../shared/models/sport-event';
import { isEventFavourite } from '../../../shared/utils/sport-event.utils';

export const getUid = (state: ApplicationState) => state.account.user?.uid;

export const getSelectedEvent = (selectedEvent: SportEvent | null, favEvents: string[]): SportEvent | null => {
    return selectedEvent ? {
        ...selectedEvent,
        isFavourite: isEventFavourite(selectedEvent, favEvents),
    } : null;
};

export const getFavouriteEvents = (events: SportEvent[] = [], favEvents: string[]): SportEvent[] => {
    return events.filter((event: SportEvent) => isEventFavourite(event, favEvents));
};

