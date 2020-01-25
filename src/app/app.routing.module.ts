import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './guards/auth.guard';


const routes: Routes = [
    {path: 'login', component: LoginComponent },
    {path: 'register', component: RegisterComponent},
     //LazyLoad, el loadChilden habilita el lazylaod
    {path: '', loadChildren: './ingreso-egreso/ingreso-egreso.module#IngresoEgresoModule', canLoad: [AuthGuard]}, 
    {path: '**', redirectTo: ''}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {} 
