import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth) { }

  async register({ nome, email, password}: {nome: any, email: any; password:any}) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;
    } catch (e) {
      return null;
    }
  }


  async login({ email, password}: {email: any; password:any}) {
    try {
      const user = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;
    } catch (e) {
      return null;
    }
  }

  logout(){
    return signOut(this.auth);
  }
}