import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AuthService } from '../../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserRegister } from '../../../../types/register.type';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatError, MatButton],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form!: FormGroup;

  constructor(
    private authService: AuthService,
    private matSnackBar: MatSnackBar,
    private router: Router,
  ) {
    this.initForm();
  }

  submit() {
    const users = this.authService.getUsers();
    const user: UserRegister | undefined = users.find((userData: UserRegister) => userData.email === this.form.value.email)

    if (!user) {
      this.matSnackBar.open('User not found', 'CL', { duration: 3000 })
      return;
    }

    if (this.form.value.password !== user?.password) {
      this.matSnackBar.open('Check your password', 'CL', { duration: 3000 });
      return;
    }

    users.map((userRegisterData: UserRegister) => {
      if (userRegisterData.login === user?.login) {
        userRegisterData.isAuth = true;
      }
    })
    window.localStorage.setItem('users', JSON.stringify(users));

    this.matSnackBar.open('Success', 'CL', { duration: 3000 });
    this.router.navigateByUrl('trello');
    this.authService.isAuth$.next(true);
    this.authService.activeUser = user;
  }
  
  getErrorMessage(fieldName: 'email' | 'password') {
    const field = this.form.controls[fieldName];
    const isRequired = field.errors?.['required'];
    if (isRequired) {
      return 'Field is required';
    }
    return fieldName === 'email' ? 'Email is not-valid' : 'Min length is 4';
  }

  private initForm() {
    this.form = new FormGroup({
      email: new FormControl('1@1.c', [Validators.required, Validators.minLength(4)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    });
  }
}
