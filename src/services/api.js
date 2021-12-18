import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

/** API Class
 * 
 * A static class that groups methods used for interacting with the backend API.
 */
class ClosetAPI {
    // auth token stored on class
    static token;

    // general request method used to make axios requests
    static async request(endpoint, data = {}, method = 'GET') {
        console.debug('API CALL:', endpoint, data, method);

        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${ClosetAPI.token}`};

        try {
            return (await axios({ url, method, data, headers })).data;
        } catch (e) {
            console.error('API ERROR:', e);
            let mes = e.response;
            throw Array.isArray(mes) ? mes : [mes];
        }
    }

    /** INDIVIDUAL API CALLS */

    /** Register User */
    static async register(data) {
        let res = await this.request('auth/register', data, 'POST');
        return res;
    }

    /** Login User */
    static async login(data) {
        let res = await this.request('auth/token', data, 'POST');
        return res;
    }

    /** Get user data */
    static async getUserData(username) {
        let res = await this.request(`users/${username}`);
        return res;
    }

    /** Get all Instruments 
     * Optional name filtering.
    */
    static async getAllInstruments(filter) {
        let requestString = 'instruments'
        if (filter && filter.name) {
            requestString += '?name=' + filter.name;
        }
        let res = await this.request(requestString);
        return res;
    }

    /** Get instrument reservations */
    static async getInstrumentReservations(instId) {
        let res = await this.request(`instruments/${instId}/reservations`);
        return res;
    }

    /** Create Reservation */
    static async createReservation(data) {
        let res = await this.request(`reservations`, data, 'POST');
        return res;
    }
}

// dev token
ClosetAPI.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTYzODkxMTc1Nn0.0ktfgodE0BBlpF6gYl1cTL3zYob3nAGTlDRtci-Yxh8";

export default ClosetAPI;