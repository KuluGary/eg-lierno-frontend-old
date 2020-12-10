import decode from "jwt-decode";

export default class Auth {
    static token = null;
    static userRoles = {
        admins: ["SUPER_ADMIN"],
        users: ["USER"],
        all: ["SUPER_ADMIN", "USER"]
    }
    

    static loggedIn = () => {
        if (!!this.getToken() && this.isValidUser()) {
            return true;
        }

        return false;
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

    static hasRole = (checkRole) => {
        const token = this.getToken();
        
        if (token) {
            const decoded = decode(token);
            const role = decoded.role || "USER";
            console.log(checkRole, role)

            return role === checkRole;
        }
    }

    static isValidUser = (token) => {
        const decoded = decode(token || this.getToken());

        return decoded.isActive;
    }
}
