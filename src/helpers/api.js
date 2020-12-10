import Auth from './auth';

export default class Api {
    static async fetchInternal(url, options) {
        url = process.env.REACT_APP_ENDPOINT + url;

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
            .then(response => response.json())
            .then(response => response.payload || response)
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