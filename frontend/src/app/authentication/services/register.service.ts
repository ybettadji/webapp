import { HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, throwError } from "rxjs";
import { User } from "src/app/core/models/user.models";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class RegisterService {

    constructor(private http: HttpClient){

    }

    checkEmail(email: string): boolean{
        const emailRegex: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if(email && email.match(emailRegex)){
            return true;
        }else {
            return false
        }
      }
    
      passwordsAreEqual(password: string, samePassword: string): boolean {
        return password === samePassword
      }
    
      hasEnoughChar(password: string, numberOfChar: number): boolean {
         return password.length >= numberOfChar
      }
    
      hasUpperCase(password: string): boolean {
        return password !== password.toLowerCase();
      }

      hasLowerCase(password: string): boolean {
        return password !== password.toUpperCase();
      }

      hasNumber(password:string): boolean {
        return password.match(/[0-9]/) !== null 
      }

      hasSpecialChar(password:string): boolean {
        const specialCharsRegex: RegExp = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return password.match(specialCharsRegex) !== null
      }

      checkPasswordRequirements(password: string){
        if(!this.hasEnoughChar(password, 8) || !this.hasUpperCase(password) ||
            !this.hasLowerCase(password) || !this.hasNumber(password) ||
            !this.hasSpecialChar(password)){
                return false
         }
        return true
      }

      checkForm(form: any){
        let {userEmail, userPassword, confirmPassword} = form
        if (!this.checkEmail(userEmail) || !this.checkPasswordRequirements(userPassword) 
            || !this.passwordsAreEqual(userPassword, confirmPassword)) {
                return false
            }
        return true
      }

    //   Agyhje671!
    // younes.bettadji2@gmail.com
      registerUser(formValue: any){        
        const user = {
            email: formValue.userEmail,
            password: formValue.userPassword
        }
      }




}
