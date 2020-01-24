import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private storage: AngularFireStorage, 
              private auth: AuthService,
              private afs:AngularFirestore,
              private afa:AngularFireAuth) { }

  cambiarImagenDePefil(img) { 
    const uid = this.auth.getUsuario().uid;
    this.storage.upload('profilepics/' + uid, img.target.files[0]).then((imgRef)=> {
      this.storage.ref('profilepics/' + uid).getDownloadURL().subscribe(url =>{
        this.afs.doc(this.afa.auth.currentUser.uid + '/user').update({
          photoURL : url
        }).then(()=> {
          this.afa.auth.currentUser.updateProfile({
            displayName: this.afa.auth.currentUser.displayName,
            photoURL: url
          })
        })
      })
    })
  }
}
