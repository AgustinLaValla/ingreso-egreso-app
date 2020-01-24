import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import Swal from 'sweetalert2'
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoading } from '../shared/ui.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  public forma: FormGroup;
  public tipo: string = 'ingreso';
  public loading: boolean = false;
  public loadingSubs: Subscription = new Subscription()

  constructor(private ieService: IngresoEgresoService, private store:Store<AppState>) { 
    this.loadingSubs = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);
  }

  ngOnInit() {
    this.forma = new FormGroup({
      'description': new FormControl('', Validators.required),
      'monto': new FormControl(0, [Validators.required, Validators.min(0)])
    })
  }

  crear_Ingreso_Egreso(){
    this.store.dispatch(new ActivarLoadingAction());
    const ingreso_egreso = new IngresoEgreso({...this.forma.value, tipo: this.tipo});
    this.ieService.agregarIngreso_Egreso(ingreso_egreso).then(()=> {
      this.store.dispatch(new DesactivarLoading());
      Swal.fire('Información añadida', ingreso_egreso.description, 'success');
      this.forma.reset({ description:'',  monto:0 });
    })
      .catch(() => this.store.dispatch(new DesactivarLoading()));
  }

  ngOnDestroy() {
    this.loadingSubs.unsubscribe()
  }

}
