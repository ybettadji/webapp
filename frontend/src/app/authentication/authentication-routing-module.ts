import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ForgotPasswordComponent } from "./components/forgot-password/forgot-password.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterConfirmationComponent } from "./components/register-confirmation/register-confirmation.component";
import { RegisterComponent } from "./components/register/register.component";

const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'register/confirmation/:id', component: RegisterConfirmationComponent},
    {path: 'forgotpassword', component: ForgotPasswordComponent}


]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class AuthenticationRoutingModule {

}