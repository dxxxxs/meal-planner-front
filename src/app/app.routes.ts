import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { PlannerComponent } from './views/planner/planner.component';

export const routes: Routes = [
    {
        path: '',
        component:HomeComponent
    },
    {
        path:'planner',
        component:PlannerComponent
    }

];
