import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable, catchError, delay, map, of, tap } from "rxjs";

export const addHeaderJst = (): HttpHeaders | undefined => {
    let token = localStorage.getItem('authToken') ?? ''
    console.log(token)
    let parsedToken = JSON.parse(token)
    if (parsedToken['access']) {
        return new HttpHeaders({
            'Authorization': `Bearer ${parsedToken['access']}`
        })
    }
    if (parsedToken['access_token']) {
        return new HttpHeaders({
            'Authorization': `Bearer ${parsedToken['access_token']}`
        })
    }
}

interface Token {
    access?: string | null
    refresh?: string | null
}

interface User {
    username: string,
    password: string
}

interface RegUser {
    username: string,
    email: string,
    password: string,
    first_name: string,
    last_name: string
}

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    private token: string | null = null
    private refresh: string | null = null
    public isAuthenticated: boolean = false

    constructor(private http: HttpClient, public router: Router) { }

    set setAuth(bool: boolean) {
        localStorage.setItem('isAuth', JSON.stringify(bool))
        this.isAuthenticated = bool
    }

    public login(userdata: User): Observable<Token> {
        return this.http.post<Token>('http://212.8.247.94:800/auth_api/token', userdata)
            .pipe(tap(
                (token: Token) => {
                    this.setToken(token)
                    this.setAuth = true
                    this.router.navigate(['/profile'])
                }
            ),
                delay(5 * 59 * 1000),
                tap(() => this.refreshToken())
            )
    }

    public register(userdata: RegUser): Observable<Token> {
        return this.http.post<Token>('http://212.8.247.94:800/auth_api/register', userdata)
            .pipe(tap(
                (token: Token) => {
                    this.setToken(token)
                    this.setAuth = true
                    this.router.navigate(['profile'])
                }
            ),
                delay(5 * 59 * 1000),
                tap(() => this.refreshToken())
            )

    }

    public setToken(token: Token) {
        localStorage.setItem('authToken', JSON.stringify(token))
        this.isAuthenticated = true
        if (token['access']) {
            this.token = token['access']
        }
        if (token['refresh']) {
            this.refresh = token['refresh']
        }
    }

    public getToken(): null | string {
        return this.token
    }
    public getRefreshToken(): null | string {
        return this.refresh
    }

    public isAuth(): Observable<boolean> {
        let localToken = localStorage.getItem('authToken')
        console.log(localToken)
        if (localToken) {
            return this.http.get<any>('http://212.8.247.94:800/auth_api/check-token', { headers: addHeaderJst() })
                .pipe(
                    map(data => data.valid),
                    catchError(() => of(false))
                )
        }
        else {
            return of(false)
        }
    }

    public refreshToken() {
        return this.http.post('http://212.8.247.94:800/auth_api/refresh', { refresh: this.getRefreshToken() })
            .subscribe({
                next: (token: Token) => this.setToken(token),
                error: (e) => {
                    this.logout()
                    console.log(e)
                }
            })
    }

    public logout() {
        this.setAuth = false
        this.setToken({ access: null, refresh: null })
        localStorage.removeItem('authToken')
        this.router.navigate(['/'])
    }
}