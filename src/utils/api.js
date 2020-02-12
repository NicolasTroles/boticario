import axios from "axios";

let api = axios.create({});

let PATH = 'https://mdaqk8ek5j.execute-api.us-east-1.amazonaws.com/v1';

class Api {
    static get(uri) {
        return api.get(`${PATH}${uri}`);
    }

    static post(uri, data) {
        return api.post(`${PATH}${uri}`, data);
    }

    static put(uri, data) {
        return api.put(`${PATH}${uri}`, data);
    }

    static patch(uri, data) {
        return api.patch(`${PATH}${uri}`, data);
    }

    static delete(uri) {
        return api.delete(`${PATH}${uri}`);
    }
}

export { Api }