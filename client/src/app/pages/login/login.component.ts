import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

    constructor(public userService: UserService,public router:Router){}

}
