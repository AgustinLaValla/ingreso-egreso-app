import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { filter, map } from 'rxjs/operators'
import { setItemsAction, unsetItemsAction } from '../ingreso-egreso/ingreso-egreso.actions';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { unsetUserAction } from '../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  private userId:string;
  private IE_listener_subscription: Subscription = new Subscription();
  private IE_items_subscription: Subscription = new Subscription();

  constructor(private afs: AngularFirestore , 
              private store:Store<AppState>, ) {
    this.init_Ingreso_Egreso_Listener();
   }

   init_Ingreso_Egreso_Listener() { 
     this.IE_listener_subscription = this.store.select('auth').pipe(filter(auth => auth != null))
                                               .subscribe(user => {
                                                 console.log('IE listener activado')
                                                 if(user.user != null){
                                                   this.ingresoEgresoItems(user.user.uid);
                                                   this.userId = user.user.uid;
                                                 }
                                                 console.log('IE listener user:', user)
                                              });
   }



  agregarIngreso_Egreso(IE: IngresoEgreso) {
     return this.afs.doc(this.userId + '/ingresos-egresos').collection('items').add({...IE});
  }


   private ingresoEgresoItems(uid:string) { 
     console.log('Item subs disparada')
     this.IE_items_subscription = this.afs.doc(`${uid}/ingresos-egresos`).collection<IngresoEgreso>('items')
             .snapshotChanges().pipe(map(action => action.map(snap => {
               const item = {...snap.payload.doc.data()};
               item.uid = snap.payload.doc.id;
               return item
            })))
             .subscribe((colection: IngresoEgreso[])=>  {
                this.store.dispatch(new setItemsAction(colection));
             })
   }

   borrarIngresoEgreso(ie:IngresoEgreso) {
     this.afs.doc(`${this.userId}/ingresos-egresos`).collection('items').doc(ie.uid).delete()
             .then(() => Swal.fire('Elmento borrado', ie.description, 'success'));
   }

   cancelarSubscripciones() { 
    this.IE_items_subscription.unsubscribe();
   //  this.store.dispatch(new unsetItemsAction());
  }

}
