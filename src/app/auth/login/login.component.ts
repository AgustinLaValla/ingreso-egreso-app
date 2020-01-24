import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  public loading: boolean = false;
  public uiSubs: Subscription;

  constructor(private auth: AuthService, public store: Store<AppState>) { }

  ngOnInit() {
   this.uiSubs = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading);
  }

  login(user:User) { 
    this.auth.login(user)
  }

  ngOnDestroy(): void {
    this.uiSubs.unsubscribe();
  }

}
