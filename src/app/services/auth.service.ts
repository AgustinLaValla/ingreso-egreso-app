import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { User } from '../interfaces/user.interface';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { create } from 'domain';
import Swal from 'sweetalert2';
import { isNullOrUndefined } from 'util';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userId:string;
  public authState: any;

  constructor(private afa: AngularFireAuth, 
              private afs: AngularFirestore,
              private router: Router
              ) { 
                this.afa.authState.subscribe((userState:firebase.User) => this.authState = userState);
              }

  register(user: User) {
    this.afa.auth.createUserWithEmailAndPassword(user.email, user.password).then(createdUser => {
         this.authState = createdUser;
         this.userId = createdUser.user.uid;
         createdUser.user.updateProfile({
         displayName: user.nombre
      })}
      ).then(() => { //Create users collection
          this.afs.doc(`${this.userId}/users`).set({
            nombre: user.nombre,
            email:user.email,
            password: user.password,
            uid: this.userId
          })
    }).then(()=> this.router.navigate(['/dashboard']))
    .catch(error => Swal.fire('Error al registrarse', error.message, 'error')) //Sweet alert snack that shows the error  
  }

  login(user:User) { 
    this.afa.auth.signInWithEmailAndPassword(user.email, user.password).then((singedUser)=>{
      this.authState = singedUser;
      this.userId = singedUser.user.uid;
    }).then(()=> this.router.navigate(['/dashboard']))
      .catch(error => { //Sweet Alert snack that shows the error
        Swal.fire('Error en el Login', error.message, 'error')
      })
  }

  //Logout
  logout() { 
    this.afa.auth.signOut().then(() => this.router.navigate(['/login']))
                           .catch((error) => Swal.fire('Error', error.message, 'error'))
  }


  getCurrentState() { 
    if(!isNullOrUndefined(this.authState)){
      return true;
    }else{
      false;
    }
  }

}
