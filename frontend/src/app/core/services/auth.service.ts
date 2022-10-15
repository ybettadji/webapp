import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

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