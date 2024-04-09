import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, ButtonComponent, ReactiveFormsModule, NgIf],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent implements OnInit {
  public signInForm: FormGroup = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*\d).{8,}$')]]     
    })
  } 

  public onSubmit() {
    if(this.signInForm.valid){
      alert('Вы успешно вошли!')
      location.reload();
    }
  }
}
