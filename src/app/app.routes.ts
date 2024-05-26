import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { PlannerComponent } from './views/planner/planner.component';
import { RegisterComponent } from './views/register/register.component';
import { LoginComponent } from './views/login/login.component';
import { ProfileComponent } from './views/profile/profile.component';
import { NotFoundPageComponent } from './views/not-found-page/not-found-page.component';

export const routes: Routes = [
    {
        path: '',
        component:HomeComponent
    },
    {
        path:'planner',
        component:PlannerComponent
    },
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'profile',
        component:ProfileComponent
    },
    {
        path: '**',
        component: NotFoundPageComponent
    }
];
