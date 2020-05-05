import { dev, prod } from './api-config';
import Auth from './auth';

export default class Api {
    static environment() {
        return process.env.NODE_ENV;
    }

    static async fetchInternal(url, options) {
        url = (this.environment() === "production" ? prod : dev) + url;

        const headers = {
            Accept: 'application/json',
            "Content-Type": "application/json"
        };

        if (Auth.loggedIn()) {
            headers["Authorization"] = "Bearer " + await Auth.getToken();

        }
        
        return fetch(url, {
            headers,
            ...options
        })
            .then(this._checkStatus)
            .then(response => response.json())
            .then(response => response.payload)
            .catch(e => console.log(e))
    }

    static _checkStatus = response => {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            response.json().then((decodedResponse) => {
                console.log(decodedResponse);
            });

            const error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    };
}