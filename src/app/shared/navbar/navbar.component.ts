import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { User } from 'src/app/models/user.model';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { PerfilService } from 'src/app/services/perfil.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  public userProfile: User;
  public userSubs: Subscription = new Subscription();

  constructor(private store: Store<AppState>, private perfilService: PerfilService) { }

  ngOnInit() {
    this.userSubs = this.store.select('auth').pipe(map(userData => userData.user)).subscribe((user: User)=> {
      this.userProfile = user;
    })
  }

  cambiarPerfilImg(img) { 
    this.perfilService.cambiarImagenDePefil(img);
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
  }

}
