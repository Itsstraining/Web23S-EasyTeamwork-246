import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  GoogleAuthProvider,
  signInWithPopup,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserState } from 'src/Ngrx/States/user.state';
import { UserModel } from 'src/models/user.model';
import * as UserActions from '../../../Ngrx/Actions/user.action';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UserService {

  public baseUrl: string = environment.baseURL + 'users/';
  public userInfo: any;

  constructor(
    public auth: Auth,
    public http: HttpClient,
    private authstore: Store<{ auth: UserState }>,
    private router: Router
  ) {
    authState(this.auth).subscribe((user) => {
      if (user != null) {
        let account: UserModel = {
          uid: user?.uid,
          displayName: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL,
        };
        this.authstore.dispatch(UserActions.loginSuccess({ user: account }));
        this.userInfo = account;
        console.log(account);
      }
    });
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return new Promise<UserModel>(async (resolve, reject) => {
      try {
        let result = await signInWithPopup(this.auth, provider);
        if (result) {
          let account: UserModel = {
            uid: result.user?.uid,
            displayName: result.user?.displayName,
            email: result.user?.email,
            photoURL: result.user?.photoURL,
          };
          resolve(account);
          this.router.navigate(['viewallproject']);
          this.http
            .post(this.baseUrl + 'login', {
              uid: account.uid,
              displayName: account.displayName,
              email: account.email,
              photoURL: account.photoURL,
            })
            .subscribe((res) => {
              console.log(res);
            });
        }
      } catch (error) {
        reject(error);
      }
    });
  }
}
