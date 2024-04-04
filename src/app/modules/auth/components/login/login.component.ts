import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatLabel, MatInput, MatError, MatButton],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form!: FormGroup;

  constructor() {
    this.initForm();
  }

  submit() {
    // console.log(this.form.controls);
    console.log(this.form.value);
    console.log('ers',this.form.errors);
    console.log(this.form.controls['email'].errors);
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
      email: new FormControl('e', [Validators.required, Validators.minLength(4)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(4)]),
    });
  }


}
