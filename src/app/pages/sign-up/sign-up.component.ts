import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ButtonComponent, RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  public signUpForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl('')
  })

  constructor(private formBuilder: FormBuilder, private AuthService: AuthService) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*\d).{8,}$')]],
      confirmPassword: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*\d).{8,}$')]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]]
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
      this.AuthService.register(this.signUpForm.value)
        .subscribe({
          next: () => {
            this.AuthService.setAuth = true
          },
          error: (e) => {
            console.log(e)
            this.AuthService.setAuth = false
          }
        })
    }
  }
}
