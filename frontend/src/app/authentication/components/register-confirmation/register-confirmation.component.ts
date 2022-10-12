import { HttpClient } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register-confirmation',
  templateUrl: './register-confirmation.component.html',
  styleUrls: ['./register-confirmation.component.scss']
})
export class RegisterConfirmationComponent implements OnInit, OnDestroy {

  successfulConfirmation: boolean = false
  registerConfirmation$!: Observable<any>
  id!: string;
  destroy$: Subject<boolean> = new Subject()

  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    this.registerConfirmation$ = this.http.put(environment.SERVER_URL + "/user/registration/confirmation/" + this.id, {})
    this.registerConfirmation$.pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      error: (httpError) => this.onNavigate('/login'),
      complete: () => this.successfulConfirmation = true})
  }

  ngOnDestroy(): void {
      this.destroy$.next(true)
  }

  onNavigate(path: string){
    this.router.navigateByUrl(path)
  }
}
