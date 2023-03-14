import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/users/user.service';
import { Store } from '@ngrx/store';
import { UserState } from 'src/NgRx/States/user.state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  constructor(
    public userService: UserService,
    private router: Router,
    private store: Store<{ user: UserState}>,
  ) { }

  auth$ = this.store.select('user');

  ngOnInit(): void {
  }

  viewallproject() {
    this.router.navigate(['viewallproject']);
  }


}
