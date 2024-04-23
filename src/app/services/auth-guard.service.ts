import { inject } from "@angular/core"
import { CanActivateFn } from "@angular/router"
import { AuthService } from "./auth.service"
import { tap } from "rxjs"


export const AuthGuard: CanActivateFn = (next: any, state: any) => {
    let authService = inject(AuthService)

    return authService.isAuth().pipe(
        tap((isAuth: boolean) => {
            if (!isAuth) {
                authService.router.navigate(['/'])
            }
        })
    )

}