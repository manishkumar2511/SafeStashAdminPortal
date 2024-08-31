import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { AccountResponse } from '../../shared/models/AccountResponse';
import {
  MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { error } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  returnUrl: string | null = null;
  errorMessages: string[] = [];
  isLoading = false;
  constructor(
    private _formBuilder: FormBuilder,
    private _accountService: AccountService,
    private _router: Router
    , private _snackBar: MatSnackBar) {

  }
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this._formBuilder.group({
      userName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      
    });
  }
  login() {
    this.errorMessages = [];
    if (this.loginForm.valid) {
     
      this.isLoading = true;
      this._accountService.login(this.loginForm.value).subscribe({
        next: (result: AccountResponse) => {
          
          if (this.returnUrl && result.succeeded && !result.requiresTwoFactor && !result.requiresPhoneNumberConfirmed) {
            this._router.navigateByUrl(this.returnUrl);
          }
          else if (!result.requiresTwoFactor && !result.requiresPhoneNumberConfirmed && result.succeeded) {
            this._router.navigateByUrl("/");
          }
          else if (!result.succeeded && !result.requiresPhoneNumberConfirmed && result.requiresTwoFactor) {
            this._router.navigate(['/account/send-2fa-code/verify-2fa-code'], { queryParams: { username: result.data.username, phonenumber: result.data.phoneNumber } });
            this._snackBar.open(result.message, 'Close', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
          this.isLoading = false;
        },
        error: error => {
          
          if (error.error.message) {
            if (error.error.requiresPhoneNumberConfirmed) {
              this._router.navigate(['/account/send-2fa-code/confirm-number'], { queryParams: { username: error.error.data.username, phonenumber: error.error.data.phoneNumber } });
            }
            else {
              this._router.navigate(['/account/verify-number'], { queryParams: { username: error.error.data.username } });
            }
            this._snackBar.open(error.error.message, 'Close', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
          else {
            this.isLoading = false;
            this.errorMessages.push(error.error);
            this._snackBar.open(error.error, 'Close', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: 3000,
              panelClass: ['error-snackbar']
            });
          }
        }
      })
    }
  }
  forgetPassword() {
    this._router.navigateByUrl('account/send-email/forget-password');
  }
}
