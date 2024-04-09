import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ButtonComponent, RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  public signUpForm: FormGroup = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl('')
  })

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*\d).{8,}$')]],
      confirmPassword: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*\d).{8,}$')]]
    }, {
      validator: this.matchPassword
    })
  }

  public matchPassword(group: FormGroup) {
    const password = group.get('password')?.value
    const confirmPassword = group.get('confirmPassword')?.value
    return password === confirmPassword ? null : { isPasswordsSim: true }
  }

  public onSubmit() {
    if (this.signUpForm.valid) {
      alert('Вы зарегистрировались!')
      location.reload();
    }
  }
}
