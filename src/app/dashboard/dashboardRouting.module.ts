//AngularModues
import { NgModule } from '@angular/core';
//Routes interface
import { Routes, RouterModule } from '@angular/router';
//ChildRoutes
import { dashboardRoutes } from './dashboard.routes'
//Guard
import { AuthGuard } from '../guards/auth.guard';
//Components
import { DashboardComponent } from './dashboard.component';

const childRoutes: Routes = [
    {path: '', component: DashboardComponent, children: dashboardRoutes, canActivate:[AuthGuard]},
]

@NgModule({
    imports: [RouterModule.forChild(childRoutes)],
    exports: [ RouterModule ]
})
export class DashboardRoutingModule {}