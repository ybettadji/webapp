import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from 'src/app/core/services/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() displayComponent!: boolean
  @Output() displayComponentChange: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() displayForgotPasswordComponentChange: EventEmitter<boolean> = new EventEmitter<boolean>()
  @Output() displayRegisterComponentChange: EventEmitter<boolean> = new EventEmitter<boolean>()


  loginForm!: FormGroup
  login$!: Observable<any>
  wrongCombination!: boolean

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null],
      password: [null]
    })
  }

  hideLoginComponent(): void {
    this.displayComponentChange.emit(false)
  }

  displayForgotPasswordComponent(): void {
    this.hideLoginComponent()
    this.displayForgotPasswordComponentChange.emit(true)

  }

  displayRegisterComponent(): void {
    this.hideLoginComponent()
    this.displayRegisterComponentChange.emit(true)
  }

  onNavigate(path: string) {
    this.router.navigateByUrl(path)
  }

  errorHandler() {
    this.wrongCombination = true;
  }

  successfulLogin(response: any) {
    this.tokenService.createToken(environment.SESSION_TOKEN_NAME, response.token)
    this.loginForm.reset()
    this.hideLoginComponent()
    this.onNavigate('/')
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;

    if (email && password) {
      this.wrongCombination = false;
      this.login$ = this.http.post(environment.SERVER_URL + "/user/login", this.loginForm.value)
      this.login$.subscribe({
        error: () => this.errorHandler(),
        next: (response) => this.successfulLogin(response),
      })
    }
  }
}