import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ResetAccessComponent } from './pages/reset-access/reset-access.component';

export const routes: Routes = [
    {
        path: '',
        component: SignInComponent
    },
    {
        path: 'sign-up',
        component: SignUpComponent
    },
    {
        path: 'reset',
        component: ResetAccessComponent
    }
];
