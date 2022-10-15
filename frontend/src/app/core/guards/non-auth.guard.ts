import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class NonAuthGuard implements CanActivate {
    constructor(private authService: AuthService, private http: HttpClient, private router: Router) {

    }
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {

        const getSessionToken = (): string | null => {
            return this.authService.getToken(environment.SESSION_TOKEN_NAME)
        }

        const checkIfSessionTokenExist = (token: string | null): string => {
            if (!token) {
                throw new Error("Unauthorized access");
            }
            return token
        }

        const checkIfTheTokenIsValid = (token: string) => {
            const request$: Observable<any> = this.http.post(environment.SERVER_URL + '/user/verify-access', { token: token })
            return request$.subscribe({
                error: () => { return true },
                complete: () => this.router.navigateByUrl('/')
            })
        }

        return await Promise.resolve()
            .then(getSessionToken)
            .then(checkIfSessionTokenExist)
            .then(checkIfTheTokenIsValid)
            .catch(err => { return true })
    }
}