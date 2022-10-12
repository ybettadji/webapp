import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, Subject, takeUntil, tap} from 'rxjs';
import { RegisterService } from '../../services/register.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm!: FormGroup;
  registerFormLiveChecking$!: Observable<any>;
  registerUser$!: Observable<any>;
  passwordRequirements!: {
    enoughChar: boolean | null,
    upperCase: boolean | null,
    lowerCase: boolean | null,
    number: boolean | null,
    specialChar: boolean | null
  }

  userEmailClass: string = '';
  passwordClass: string = '';
  emailIsAvailable: boolean | null = null
  destroy$: Subject<boolean> = new Subject<boolean>();
  passwordsAreEqual: boolean | null = null;
  validPassword: boolean | null = null
  successfulRegistration: boolean = false;
  
  constructor(private router: Router, private formBuilder: FormBuilder, private registerService: RegisterService,
              private http: HttpClient) {
    
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userEmail: [null],
      userPassword: [null],
      confirmPassword: [null]
    },
    {
      updateOn: 'blur'
    })

    this.registerFormLiveChecking$ = this.registerForm.valueChanges.pipe(
      takeUntil(this.destroy$),
      tap((form) => this.checkIfEmailIsValid(form.userEmail)),
      tap((form) => this.checkIfPasswordsAreEqual(form.userPassword, form.confirmPassword)),
      tap((form) => this.checkPasswordRequirements(form.userPassword))
    )
    this.registerFormLiveChecking$.subscribe()
  }

  ngOnDestroy(): void{
    this.destroy$.next(true)
  }

  onNavigate(path: string): void{
    this.router.navigateByUrl(path)
  }

  checkIfEmailIsValid(userEmail: string){
     if(userEmail !== null){
      const userEmailIsValid = this.registerService.checkEmail(userEmail)
      userEmailIsValid ? this.userEmailClass = '' : this.userEmailClass = 'input-not-valid';
    }
  }

  checkIfPasswordsAreEqual(userPassword: string, confirmPassword: string){
    if(confirmPassword !== null){
      this.passwordsAreEqual = this.registerService.passwordsAreEqual(userPassword, confirmPassword)
      this.passwordsAreEqual ? this.passwordClass = '' : this.passwordClass = 'input-not-valid'
    }
  }

  checkPasswordRequirements(userPassword: string){
    if(userPassword !== null){
      this.passwordRequirements = {
        enoughChar: this.registerService.hasEnoughChar(userPassword, 8),
        upperCase: this.registerService.hasUpperCase(userPassword),
        lowerCase: this.registerService.hasLowerCase(userPassword),
        number: this.registerService.hasNumber(userPassword),
        specialChar: this.registerService.hasSpecialChar(userPassword),
      }
      this.validPassword = Object.values(this.passwordRequirements).every(value => value === true)
    }
  }

  errorHandler(httpError: HttpErrorResponse){
    console.log(httpError);
    
    if (httpError.error === 'The user already exists') {
      this.emailIsAvailable = false;
      this.userEmailClass = 'input-not-valid';
    }
  }

  resetErrorMessagesAndStyles(){
    this.emailIsAvailable = null;
    this.userEmailClass = '';
    this.passwordClass = '';
    this.passwordsAreEqual = null;
    this.validPassword = null;
  }

  finishRegistrationProcess(){
    this.successfulRegistration = true
  }

  onSubmit(){
    const formIsValid = this.registerService.checkForm(this.registerForm.value)

    if(formIsValid){
      this.resetErrorMessagesAndStyles()
      const newUser = {
        email: this.registerForm.value.userEmail,
        password: this.registerForm.value.userPassword
      }
      const registerUser$ = this.http.post(environment.SERVER_URL + '/user/registration', newUser).pipe(takeUntil(this.destroy$))   
      registerUser$.subscribe({
          error: (httpError) => this.errorHandler(httpError),
          complete: () => this.finishRegistrationProcess()})
    } 
  }
}

