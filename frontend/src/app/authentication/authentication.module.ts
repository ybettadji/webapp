import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { MatIconModule } from '@angular/material/icon';
import { RegisterConfirmationComponent } from './components/register-confirmation/register-confirmation.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';




@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    RegisterConfirmationComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  exports: [

  ]
})
export class AuthenticationModule { }
