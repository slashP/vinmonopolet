export default class Auth {
    static STORAGE_KEY: string = "token";
    static window = window || {};
    static getToken() {
        return localStorage && localStorage.getItem(Auth.STORAGE_KEY);
    }

    static setToken(token: string) {
        localStorage && localStorage.setItem(Auth.STORAGE_KEY, token);
    }

    static removeToken(): void {
        localStorage && localStorage.removeItem(Auth.STORAGE_KEY);
    }
}
