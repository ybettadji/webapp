import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  @Input() displayComponent!: boolean
  @Output() displayComponentChange: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() displayLoginComponentChange: EventEmitter<boolean> = new EventEmitter<boolean>()
  forgotPasswordForm!: FormGroup;
  emailIsValid!: boolean;
  successfulForgotPassword!: boolean;

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      email: [null]
    })
    //   this.successfulForgotPassword = true
  }

  displayForgotPasswordComponent() {
    this.displayComponentChange.emit(false)
  }

  displayLoginComponent() {
    this.displayForgotPasswordComponent()
    this.displayLoginComponentChange.emit(true)
  }

  onNavigate(path: string) {
    this.router.navigateByUrl(path)
  }

  checkIfEmailIsValid(email: string): boolean {
    const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    if (email && email.match(emailRegex)) {
      return true;
    } else {
      console.log(email, email.match(emailRegex));

      return false
    }
  }


  finishForgotPasswordProcess() {
    this.forgotPasswordForm.reset()
    this.successfulForgotPassword = true
  }

  onSubmit() {
    this.emailIsValid = this.checkIfEmailIsValid(this.forgotPasswordForm.value.email)
    if (this.emailIsValid) {
      const forgotPassword$ = this.http.post(environment.SERVER_URL + "/user/forgot-password", { email: this.forgotPasswordForm.value.email })
      forgotPassword$.subscribe({
        error: (httpError) => console.log(httpError),
        complete: () => this.finishForgotPasswordProcess()
      })
    }
  }

}
