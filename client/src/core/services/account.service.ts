import axios from 'axios'
import { API_URL } from 'core/config/api.config';

const api = axios.create({
    baseURL: API_URL,
});

export const fetchAccountDetails = (userId: string): Promise<any> => {
    return api.get(`/account/${userId}`);
}

export const accountApis = {
    fetchAccountDetails
};
