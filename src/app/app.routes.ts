import { Routes } from '@angular/router';
import { Principal } from './pages/principal/principal';
import { Planes } from './pages/planes/planes';
import { Proyectos } from './pages/proyectos/proyectos';
import { AcercaNosotros } from './pages/acerca-nosotros/acerca-nosotros';

export const routes: Routes = [
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'home', component: Principal},
    {path:'proyectos', component:Proyectos},
    {path:'planes', component:Planes},
    {path:'anosotros', component:AcercaNosotros}
];
