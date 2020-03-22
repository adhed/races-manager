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

export const eventApis = {
    insertEvent,
    getAllEvents,
    updateEventById,
    deleteEventById,
    getEventById,
};
