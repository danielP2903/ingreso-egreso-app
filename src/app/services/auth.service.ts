import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase/compat';
import { map } from 'rxjs';
import { Usuario } from '../models/usuario.model';
import { AppState } from '../app.reducer';
import { setUser, unSetUser } from '../auth/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth, 
              public fireStore : AngularFirestore,
              private store : Store<AppState>) { }

  initAuthListener(){
    this.auth.authState.subscribe(fuser =>{
      console.log(fuser);
      if(fuser){
        const tempUser = new Usuario(fuser!.uid,fuser!.email);
        this.store.dispatch(setUser({user:tempUser}))
      }else {
        this.store.dispatch(unSetUser());
      }
     
      
    })
  }

  crearUsuario(email:string, password:string){
    return this.auth.createUserWithEmailAndPassword(email,password).then(fbuser =>{
      const user = new Usuario(fbuser.user!.uid,fbuser.user!.email);
      const uid = fbuser.user?.uid
      const email = fbuser.user?.email
      return this.fireStore.doc(`${uid}/usuario`).set({
        uid,
        email
      });

    });
  }

  autenticarUsuario(email:string, password:string){
   return  this.auth.signInWithEmailAndPassword(email,password);
  }

  logut(){
  return  this.auth.signOut();
  }

  isAuth(){
    return this.auth.authState.pipe(
      map(fuser => fuser !=null)
    )
  }
}
