import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { map } from 'rxjs/operators';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { Subscription } from 'rxjs';
import { Label, MultiDataSet } from 'ng2-charts';
import { ChartType } from 'chart.js';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  public ingresosEgresos: IngresoEgreso[];

  public ingreso: number = 0;
  public egreso: number = 0;

  public cuantosIngresos: number = 0;
  public cuantosEgresos: number = 0;

  public IE_subs: Subscription = new Subscription();

  //Chart variables
  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private store:Store<AppState>) { }

  ngOnInit() {
    this.IE_subs = this.store.select('IE').pipe(map(IEdata => IEdata.items)).subscribe((IE: IngresoEgreso[])=>{
      this.ingresosEgresos = IE;
      this.calcularIngresos();
    })
  }

  calcularIngresos() {
    this.ingresosEgresos.map(EI_element => {
      if(EI_element.tipo === 'ingreso'){
        this.ingreso += EI_element.monto;
        this.cuantosIngresos++;
      }else{
        this.egreso += EI_element.monto;
        this.cuantosEgresos++;
      }
    })
    this.doughnutChartData.push([this.ingreso, this.egreso])
  }

  ngOnDestroy() {
    this.IE_subs.unsubscribe();
  }

}

