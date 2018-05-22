import axios from 'axios'
export const BASE = "http://localhost:3000";
// export const FAKE_URL = "https://jsonplaceholder.typicode.com/posts"

export default class Api {
    static async get(url){
        return await axios.get(`${BASE}${url}`);
    }

    static async post(url, body){
        return await axios.post(`${BASE}${url}`, body);
    }

    static async put(url, body){
        return await axios.put(`${BASE}${url}`);
    }
}