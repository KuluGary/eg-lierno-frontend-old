
import decode from "jwt-decode";

export default class Auth {
    static token = null;

    static loggedIn = () => {
        return sessionStorage.getItem('token') || localStorage.getItem('token') ? true : false;      
    }

    static isTokenExpired = token => {
        try {
            const decoded = decode(token);
            return (decoded.exp < Date.now() / 1000)
        } catch (err) {
            return false;
        }
    }

    static getToken = () => {        
        return sessionStorage.getItem('token') || localStorage.getItem('token');
    }

    static hasRole = (checkRole)  => {
        const token = this.getToken();
        if (token) {

            const decoded = decode(token);
            return decoded.roles && decoded.roles.some(role => role === checkRole);
        }
    }
}
