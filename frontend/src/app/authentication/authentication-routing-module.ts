import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NonAuthGuard } from "../core/guards/non-auth.guard";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterConfirmationComponent } from "./components/register-confirmation/register-confirmation.component";
import { RegisterComponent } from "./components/register/register.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";

const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [NonAuthGuard] },
    { path: 'register', component: RegisterComponent, canActivate: [NonAuthGuard] },
    { path: 'register/confirmation/:token', component: RegisterConfirmationComponent, canActivate: [NonAuthGuard] },
    { path: 'forgotpassword', component: ForgotPasswordComponent, canActivate: [NonAuthGuard] },
    { path: 'reset-password/:token', component: ResetPasswordComponent, canActivate: [NonAuthGuard] }


]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class AuthenticationRoutingModule {

}