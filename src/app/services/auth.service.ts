import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { isNullOrUndefined } from 'util';
import * as firebase from 'firebase';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoading } from '../shared/ui.actions';
import { setUserAction, unsetUserAction } from '../auth/auth.actions';
import { Subscription } from 'rxjs';
import { IngresoEgresoService } from './ingreso-egreso.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userId:string;
  private authState: any;
  private userSubs: Subscription = new Subscription();
  private usuario: User;
  private stadarPhotoUrl ='https://firebasestorage.googleapis.com/v0/b/ingreso-egresoapp-1feb0.appspot.com/o/profilepics%2FporfilePic.png?alt=media&token=8c736666-0d3a-4805-86e9-50a6f43d2447'

  constructor(private afa: AngularFireAuth, 
              private afs: AngularFirestore,
              private router: Router,
              private store: Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService
              ) { 
                this.initAuthListener();
              }

  initAuthListener() {
    this.afa.authState.subscribe((userState:firebase.User) => {
      this.authState = userState;  
      if(userState) { 
          this.userSubs = this.afs.doc<User>(`${userState.uid}/user`).valueChanges().subscribe((user)=> {
          const newUser = new User(user);
          this.store.dispatch(new setUserAction(newUser));
          this.usuario = new User(newUser)
        })
      }else{
          this.userSubs.unsubscribe(); //authState works globally, that's why subscription and unsubscription
          this.usuario = null;
      }
    });
   }

  register(user: User) {
    //Dispatch de la acción para activar loading
    this.store.dispatch( new ActivarLoadingAction() );

    this.afa.auth.createUserWithEmailAndPassword(user.email, user.password).then(createdUser => {
         this.authState = createdUser;
         this.userId = createdUser.user.uid;
         createdUser.user.updateProfile({
         displayName: user.nombre,
         photoURL: this.stadarPhotoUrl
      })}
      ).then(() => { //Create users collection
          this.afs.doc(`${this.userId}/user`).set({
            nombre: user.nombre,
            email:user.email,
            uid: this.userId,
            photoURL: this.stadarPhotoUrl
          })
    }).then(()=>{
     
      this.store.dispatch(new DesactivarLoading()); //Dispatch de la acción para desactivar loading
      this.router.navigate(['/'])
  })
    .catch(error => {
      this.store.dispatch(new DesactivarLoading());
      Swal.fire('Error al registrarse', error.message, 'error');//Sweet alert snack that shows the error  
  }) 
  }

  login(user:User) { 
    this.store.dispatch(new ActivarLoadingAction()); // Dispatch de la acción para activar loading
    this.afa.auth.signInWithEmailAndPassword(user.email, user.password).then((singedUser)=>{
      this.authState = singedUser;
      this.userId = singedUser.user.uid;
      
    }).then(()=> {
      this.store.dispatch(new DesactivarLoading());  //Dispatch de la acción para desactivar loading
      this.router.navigate(['/'])
  })
      .catch(error => { 
        this.store.dispatch(new DesactivarLoading());
        Swal.fire('Error en el Login', error.message, 'error');//Sweet Alert snack that shows the error
      })
  }

  //Logout
  logout() { 
    this.router.navigate(['/login']);
    this.afa.auth.signOut().then(() => this.ingresoEgresoService.cancelarSubscripciones());
    this.store.dispatch( new unsetUserAction())
  }


  getCurrentState() { 
    return this.afa.authState.pipe(map(user => {
      if(user === null) {
        this.router.navigate(['/login'])
      }
      return user != null
    }))
  }

  getUsuario(): User { 
    return {...this.usuario};
  }

}
