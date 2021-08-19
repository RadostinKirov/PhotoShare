import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: any;
  errorMessage = '';
  time = 5;


  constructor(
    private activateRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router) { };

  login(form: NgForm) {

    const username = form.value.username;
    const password = form.value.password;
    let response = this.userService.login({ username, password }).subscribe({
      next: user => {
        this.user = user;
        this.router.navigate(['/']);

      },
      error: error => {
        this.errorMessage = error.error;
        console.error('An error occure -> ', this.errorMessage);
        this.time = 5;
        const timer = setInterval(() => {
          if (this.time <= 0) {
            clearInterval(timer);
          }
          this.time--;
          if (this.time == 0) {
            this.errorMessage = '';
          }
        }, 1000);
      }
    })

  }


}





