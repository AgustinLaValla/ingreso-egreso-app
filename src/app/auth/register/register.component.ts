import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  public loading: boolean = false;
  public uiSubs: Subscription;

  constructor(private auth: AuthService, public store:Store<AppState>) { }

  ngOnInit() {
   this.uiSubs = this.store.select('ui').subscribe(ui => this.loading = ui.isLoading)
  }

  onSubmit(data:User){
    this.auth.register(data);
  }

  ngOnDestroy(): void {
    this.uiSubs.unsubscribe();
  }

}
