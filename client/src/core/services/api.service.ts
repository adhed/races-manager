import axios from 'axios';

export class ApiService {
    private readonly API_URL: string = '/api';
    
    public get(endpoint: string): Promise<any> {
        return axios.get(`${this.API_URL}/${endpoint}`);
    }

    public post(endpoint: string, body: any): Promise<any> {
        return axios.post(`${this.API_URL}/${endpoint}`, body);
    }
}
