import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isAuth!: boolean
  displayLoginComponent: boolean = false;
  displayForgotPasswordComponent: boolean = false;
  displayRegisterComponent: boolean = false;

  constructor(private authService: AuthService) {

  }



  async ngOnInit() {
    await this.checkIfUserIsLogged()
    console.log(this.isAuth);

  }

  displayLogin() {
    this.displayLoginComponent = !this.displayLoginComponent
  }

  async changeDisplayLoginComponent(eventBoolean: any) {
    await this.checkIfUserIsLogged()
    this.displayLoginComponent = eventBoolean
  }

  changeDisplayForgotPasswordComponent(eventBoolean: any) {
    this.displayForgotPasswordComponent = eventBoolean
  }

  changeDisplayRegisterComponent(eventBoolean: any) {
    this.displayRegisterComponent = eventBoolean
  }

  async checkIfUserIsLogged() {
    await this.authService.isAuth().then(value => {
      if (value === false) {
        this.isAuth = false
      } else {
        this.isAuth = true
      }
    })
  }

  @HostListener('window:storage')
  async onStorageChange() {
    await this.checkIfUserIsLogged()
  }

}
