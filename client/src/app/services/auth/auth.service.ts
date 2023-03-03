import { Injectable } from '@angular/core';
import { Auth, GoogleAuthProvider, User } from '@angular/fire/auth';
import { signInWithPopup } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  currentUser!: User | null;
  constructor(public auth:Auth) { }

  async loginWithGoogle(){
    let googleProvider = new GoogleAuthProvider(); 
    return await signInWithPopup(this.auth, googleProvider);
  }
  async logoutwithGoogle(){
    this.auth.signOut();
  }
}
