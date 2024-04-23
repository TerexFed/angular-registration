import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) { }

  get isAuthenticated() {
    return this.authService.isAuthenticated
  }

  logout() {
    this.authService.logout()
  }

  ngOnInit(): void {
    let localIsAuth = localStorage.getItem('isAuth')
    if (localIsAuth) {
      let parsedBool = JSON.parse(localIsAuth)
      this.authService.setAuth = parsedBool
    }
  }
}
