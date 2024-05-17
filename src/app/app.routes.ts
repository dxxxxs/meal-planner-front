import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { PlannerComponent } from './views/planner/planner.component';
import { RegisterComponent } from './views/register/register.component';
import { LoginComponent } from './views/login/login.component';
import { ProfileComponent } from './views/profile/profile.component';

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

];
