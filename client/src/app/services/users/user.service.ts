import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserState } from '../../../NgRx/States/user.state';
import { UserModel } from 'src/models/user.model';
import * as UserActions from '../../../NgRx/Actions/user.action';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public baseUrl: string = environment.baseURL + '/users/';
  public userInfo: any;

  currentUserId!: string | null;

  constructor(
    public auth: Auth,
    public http: HttpClient,
    private authstore: Store<{ auth: UserState }>,
    private router: Router
  ) {
    authState(this.auth).subscribe((user) => {
      if (user != null) {
        this.currentUserId = user.uid;
        let account: UserModel = {
          uid: user?.uid,
          displayName: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL,
        };
        this.authstore.dispatch(UserActions.loginSuccess({ user: account }));
        this.userInfo = account;
      }
    });
  }

  loginWithGoogle() {
    const ggauthprovider = new GoogleAuthProvider();
    return new Promise<UserModel>(async (resolve, reject) => {
      try {
        let result = await signInWithPopup(this.auth, ggauthprovider);
        if (result) {
          let account: UserModel = {
            uid: result.user?.uid,
            displayName: result.user?.displayName,
            email: result.user?.email,
            photoURL: result.user?.photoURL,
          };
          resolve(account);
          this.router.navigate(['/viewallproject']);
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

  async logoutWithGoogle() {
    return new Promise<string>(async (resolve, reject) => {
      try {
        await this.auth.signOut();
        localStorage.removeItem('userInfo');
        resolve('Logout Success');
        this.router.navigate(['/login']);
      } catch (error) {
        reject(error);
      }
    });
  }

  getAllUser() {
    return this.http.get(this.baseUrl + 'getAllUsers') as Observable<UserModel[]>;
  }

  getUserById(id: string | null) {
    return this.http.get(`${this.baseUrl}getId/${id}`) as Observable<UserModel>;
  }
}
