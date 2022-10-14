import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup
  login$!: Observable<any>
  wrongCombination!: boolean

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null],
      password: [null]
    })
  }

  onNavigate(path: string) {
    this.router.navigateByUrl(path)
  }

  errorHandler() {
    this.wrongCombination = true;
  }

  successfulLogin(response: any) {
    sessionStorage.setItem(environment.SESSION_TOKEN_NAME, response.token)
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