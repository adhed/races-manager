import axios from 'axios'
import { SportEvent } from '../../shared/models/sport-event'

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
})

export const insertEvent = (payload: SportEvent) => api.post(`/event`, payload);
export const getAllEvents = () => api.get(`/events`);
export const updateEventById = (id: number, payload: SportEvent) => api.put(`/event/${id}`, payload);
export const deleteEventById = (id: string) => api.delete(`/event/${id}`);
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

export const eventApis = {
    insertEvent,
    getAllEvents,
    updateEventById,
    deleteEventById,
    getEventById,
};
