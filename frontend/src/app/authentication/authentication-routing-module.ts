import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterConfirmationComponent } from "./components/register-confirmation/register-confirmation.component";
import { RegisterComponent } from "./components/register/register.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'register/confirmation/:token', component: RegisterConfirmationComponent },
    { path: 'forgotpassword', component: ForgotPasswordComponent },
    { path: 'reset-password/:token', component: ResetPasswordComponent }


]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class AuthenticationRoutingModule {

}