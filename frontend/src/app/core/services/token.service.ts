import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    constructor() {

    }

    createToken(tokenName: string, token: string): void {
        sessionStorage.setItem(tokenName, token)
    }

    getToken(tokenName: string): string | null {
        return sessionStorage.getItem(tokenName);
    }

    removeToken(tokenName: string): void {
        sessionStorage.removeItem(tokenName);
    }

    removeSessionStorage(): void {
        sessionStorage.clear();
    }
}