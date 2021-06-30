import decode from "jwt-decode";

export default class Auth {
    static token = null;
    static userRoles = {
        admins: ["SUPER_ADMIN"],
        users: ["USER", "SUPER_ADMIN"],
    };

    static setToken = (token) => {
        return new Promise((resolve, reject) => {
            if (this.isValidUser(token)) {
                try {
                    localStorage.setItem("token", token);
                    resolve();
                } catch (e) {
                    reject(e);
                }
            } else {
                reject("Token inválido.");
            }
        });
    };

    static loggedIn = () => {
        if (!!this.getToken() && this.isValidUser() && !this.isTokenExpired()) {
            return true;
        }

        return false;
    };

    static isTokenExpired = (token) => {
        const decoded = decode(token || this.getToken());

        return decoded.exp < Date.now() / 1000;
    };

    static getToken = () => {
        return sessionStorage.getItem("token") || localStorage.getItem("token");
    };

    static hasRole = (checkRole) => {
        const token = this.getToken();

        if (token) {
            const decoded = decode(token);
            const role = decoded.role || "USER";

            return role === checkRole;
        }
    };

    static getStreamToken = () => {
        const { streamToken } = decode(this.getToken());

        return streamToken;
    };

    static isValidUser = (token) => {
        const decoded = decode(token || this.getToken());

        return decoded.isActive;
    };

    static me = () => {
        const decoded = decode(this.getToken());

        return decoded;
    };
}
