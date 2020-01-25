//Angular modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
//ChartModule
import { ChartsModule } from 'ng2-charts';
//Custom modules
import { SharedModule } from '../shared/shared.module';
//ChildRoutes Module
import { DashboardRoutingModule } from '../dashboard/dashboardRouting.module'
//Pipes
import { OrdenIngresoEgresoPipe } from '../pipes/orden-ingreso-egreso.pipe';
//Components
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { DetalleComponent } from './detalle/detalle.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { StoreModule } from '@ngrx/store';
//
import * as fromIE from './ingreso-egreso.reducer'; 

const ingresoEgresoComponents = [ IngresoEgresoComponent, 
                                  EstadisticaComponent, 
                                  DetalleComponent, 
                                  DashboardComponent, 
                                  OrdenIngresoEgresoPipe]

@NgModule({
    declarations: [ingresoEgresoComponents],
    imports: [ CommonModule, 
               ReactiveFormsModule, 
               ChartsModule, 
               SharedModule, 
               DashboardRoutingModule,
               //El forFeature permite añadir dinamicamente el nodo al estado global de la aplicación (AppState)
               StoreModule.forFeature('IE', fromIE.IE_Reducer) //Argumetos: Nombre del nodo, reducer            
],
    exports: [ingresoEgresoComponents],
    providers: [],
})
export class IngresoEgresoModule {}