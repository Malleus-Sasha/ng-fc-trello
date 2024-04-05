import { Component } from '@angular/core';
import { FormFields } from '../../types/fields.type';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserRegister } from '../../../../types/register.type';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatError],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  public form!: FormGroup;

  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
  ) {
    this.initForm();
  }

  public submit(): void {
    const login: string = this.form.value.login;
    const userData: UserRegister = {
      email: this.form.value.email,
      password: this.form.value.password,
      login,
      isAuth: true
    }
    const users = this.authService.getUsers();
    users.push(userData);

    window.localStorage.setItem('users', JSON.stringify(users))

    this.snackBar.open('Success', 'CL', { duration: 3000 });
    this.router.navigate(['./trello']);
    this.authService.isAuth$.next(true);
    this.authService.activeUser = userData;
  }

  public getErrorMessage(fieldName: FormFields): string {
    const field: AbstractControl = this.form.controls[fieldName];
    const isRequired: boolean = field?.errors?.['required'];
    if (isRequired) {
      return 'Field is required';
    }
    return fieldName === 'email'
      ? 'Email is not-valid'
      : 'Min length is 5';
  }

  private initForm(): void {
    this.form = new FormGroup<any>({
      email: new FormControl(null, [Validators.required, Validators.email]),
      login: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(5)]),
    })
  }
}
