import axios from 'axios'
import { SportEvent } from '../../shared/models/sport-event'
import { API_URL } from 'core/config/api.config';

const api = axios.create({
    baseURL: API_URL,
})

export const insertEvent = (payload: SportEvent) => api.post(`/event`, payload);
export const getAllEvents = () => api.get(`/events`);
export const updateEventById = (id: number, payload: SportEvent, userId: string) => api.put(`/event/${id}/${userId}`, payload);
export const deleteEventById = (id: string, userId: string) => api.delete(`/event/${id}/${userId}`);
export const getEventById = (id: number) => api.get(`/event/${id}`);

export const addEventToFavourites = (eventId: number, userId: string) => {
    return api.post(`/favourite-event/${userId}`, { eventId });
};

export const removeEventFromFavourites = (eventId: number, userId: string) => {
    return api.put(`/favourite-event/${userId}`, { eventId });
};

export const fetchFavouriteEvents = (userId: string) => {
    return api.get(`/favourite-events/${userId}`);
}

export const setEventActive = (eventId: number, userId: string) => {
    return api.put(`/active-event/${eventId}`, { uid: userId });
}

export const getInactiveEvents = () => {
    return api.get(`/inactive-events`);
}

export const eventApis = {
    insertEvent,
    getAllEvents,
    updateEventById,
    deleteEventById,
    getEventById,
};
