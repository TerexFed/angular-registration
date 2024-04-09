import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-reset-access',
  standalone: true,
  imports: [ButtonComponent, RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './reset-access.component.html',
  styleUrl: './reset-access.component.css'
})
export class ResetAccessComponent {
  public resetForm: FormGroup = new FormGroup({
    login: new FormControl(''),
  })

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      login: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    })
  }

  public onSubmit() {
    if(this.resetForm.valid){
      alert('Вы сбросили пароль! Ожидайти письма на почту ')
      location.reload();
    }
  }
}
