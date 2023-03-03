import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { onAuthStateChanged } from '@firebase/auth';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(public authService:AuthService, private auth:Auth,private router:Router){}
    ngOnInit(): void {
      onAuthStateChanged(this.auth, (user) => {
        if(!user) {
          this.authService.currentUser = user;
          this.router.navigate([''])
        }
      })
    }
}
