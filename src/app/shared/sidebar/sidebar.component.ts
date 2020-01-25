import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import { unsetItemsAction } from 'src/app/ingreso-egreso/ingreso-egreso.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  public userProfile: User;

  constructor(private auth:AuthService, 
              private store: Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.store.select('auth').pipe(map(data => data.user)).subscribe((user:User)=> {
      this.userProfile = user;
    })
  }

  logout(){ 
    this.auth.logout();
    
    this.store.dispatch(new unsetItemsAction());
  }

}
