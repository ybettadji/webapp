import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup

  constructor(private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null],
      password: [null]
    })
  }

  onNavigate(path: string) {
    this.router.navigateByUrl(path)
  }

  onSubmit() {
    console.log(this.loginForm.value);
    // if (this.checkIfEmailIsValidFormat(email)) {

    // }

  }
}