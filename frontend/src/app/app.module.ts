import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app.component';
import { AuthenticationRoutingModule } from './authentication/authentication-routing-module';
import { AuthenticationModule } from './authentication/authentication.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    AuthenticationRoutingModule,
    HttpClientModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [MatIconModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
