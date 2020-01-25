import { Component, OnInit, OnDestroy } from '@angular/core';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { Store } from '@ngrx/store';
import * as fromIE from '../ingreso-egreso/ingreso-egreso.reducer'
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit, OnDestroy {

  private IE_subs: Subscription = new Subscription();

  constructor(private ingresoEgresoService: IngresoEgresoService, private store:Store<fromIE.App_State>) { }

  ngOnInit() {
  //  this.IE_subs = this.store.select('IE').pipe(filter(data => data != null)).subscribe(console.log);
  }

  ngOnDestroy(): void {
    // this.IE_subs.unsubscribe()
  }

}
