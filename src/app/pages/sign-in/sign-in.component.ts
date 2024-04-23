import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, ButtonComponent, ReactiveFormsModule, NgIf],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  public signInForm: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private formBuilder: FormBuilder, private AuthService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      username: ['', [Validators.required, /** Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$') */]],
      password: ['', [Validators.required, /**Validators.pattern('^(?=.*[A-Z])(?=.*\d).{8,}$') */]]
    })
  }

  public onSubmit() {
    if (this.signInForm.valid) {
      console.log(this.signInForm.value)
      this.AuthService.login(this.signInForm.value)
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
