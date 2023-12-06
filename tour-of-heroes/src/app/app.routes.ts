import { Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailsComponent } from './hero-details/hero-details.component';

export const routes: Routes = [
    { path : '', redirectTo : '/dashboard', pathMatch : 'full'},
    { path: 'heroes', component: HeroesComponent },
    { path : 'dashboard', component : DashboardComponent},
    { path : 'details/:id' , component : HeroDetailsComponent}
];
