import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm!: FormGroup;
  resetPasswordFormLiveChecking$!: Observable<any>;
  resetPassword$!: Observable<any>;
  passwordRequirements!: {
    enoughChar: boolean | null,
    upperCase: boolean | null,
    lowerCase: boolean | null,
    number: boolean | null,
    specialChar: boolean | null
  }

  passwordClass: string = '';
  destroy$: Subject<boolean> = new Subject<boolean>();
  passwordsAreEqual: boolean | null = null;
  validPassword: boolean | null = null
  successfulResetPassword: boolean = false;
  errorResetPassword: boolean = false

  constructor(private router: Router, private formBuilder: FormBuilder, private registerService: RegisterService,
    private http: HttpClient, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      password: [null],
      confirmPassword: [null]
    },
      {
        updateOn: 'blur'
      })

    this.resetPasswordFormLiveChecking$ = this.resetPasswordForm.valueChanges.pipe(
      takeUntil(this.destroy$),
      tap((form) => this.checkIfPasswordsAreEqual(form.password, form.confirmPassword)),
      tap((form) => this.checkPasswordRequirements(form.password))
    )
    this.resetPasswordFormLiveChecking$.subscribe()

    // this.successfulResetPassword = true
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
  }

  onNavigate(path: string): void {
    this.router.navigateByUrl(path)
  }

  checkIfPasswordsAreEqual(password: string, confirmPassword: string) {
    if (confirmPassword !== null) {
      this.passwordsAreEqual = this.registerService.passwordsAreEqual(password, confirmPassword)
      this.passwordsAreEqual ? this.passwordClass = '' : this.passwordClass = 'input-not-valid'
    }
  }

  checkPasswordRequirements(password: string) {
    if (password !== null) {
      this.passwordRequirements = {
        enoughChar: this.registerService.hasEnoughChar(password, 8),
        upperCase: this.registerService.hasUpperCase(password),
        lowerCase: this.registerService.hasLowerCase(password),
        number: this.registerService.hasNumber(password),
        specialChar: this.registerService.hasSpecialChar(password),
      }
      this.validPassword = Object.values(this.passwordRequirements).every(value => value === true)
    }
  }

  errorHandler(httpError: HttpErrorResponse) {
    this.errorResetPassword = true
  }

  resetErrorMessagesAndStyles() {
    this.passwordClass = '';
    this.passwordsAreEqual = null;
    this.validPassword = null;
    this.errorResetPassword = false

  }

  finishRegistrationProcess() {
    this.resetPasswordForm.reset()

    this.successfulResetPassword = true
  }

  onSubmit() {
    const token = this.route.snapshot.params['token']
    const { password, confirmPassword } = this.resetPasswordForm.value
    this.checkPasswordRequirements(password)
    this.checkIfPasswordsAreEqual(password, confirmPassword)
    if (this.validPassword && this.passwordsAreEqual) {
      this.resetErrorMessagesAndStyles()
      const newPassword = {
        password: this.resetPasswordForm.value.password
      }
      const resetPassword$ = this.http.put(environment.SERVER_URL + '/user/reset-password/' + token, newPassword).pipe(takeUntil(this.destroy$))
      resetPassword$.subscribe({
        error: (httpError) => this.errorHandler(httpError),
        complete: () => this.finishRegistrationProcess()
      })
    }
  }

}
