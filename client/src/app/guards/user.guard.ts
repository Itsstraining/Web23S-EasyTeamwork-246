import { Injectable } from '@angular/core';
import { Auth, authState, user } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { onAuthStateChanged } from '@firebase/auth';
import { Observable } from 'rxjs';
import { UserService } from '../services/users/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(private auth: Auth, private userService: UserService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (userInfo) => {
        if (userInfo) {
          this.userService.userInfo = userInfo;
          resolve(true);
        } else {
          this.userService.userInfo = null;
          resolve(false);
          this.router.navigate(['/login']);
        }
      });
    });
  }
}
