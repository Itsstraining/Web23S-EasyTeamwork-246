import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { onAuthStateChanged } from '@firebase/auth';
import { UserService } from 'src/app/services/uers/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(public userService:UserService, private auth:Auth,private router:Router){}
    ngOnInit(): void {
    }

    hometask(){
      this.router.navigate(['hometask']);
    }

    viewallproject(){
      this.router.navigate(['viewallproject']);
    }
}
