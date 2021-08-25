import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    get isLogged(): boolean {
    return this.userService.isLogged;
  }

  get username() {
    const username: any = this.userService.userInfo
    return username.username;
  }

  constructor(
    private userService: UserService,
    private router: Router) {}
  

  logout(): void {
    this.userService.logout();
    this.router.navigate(['/']);
  }


}
