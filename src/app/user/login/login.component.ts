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
  errorMessage = '';
  time = 5;


  constructor(
    private activateRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router) { };

  setError(err: string) {
    console.error('An error occure -> ', err);
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

  login(form: NgForm) {
    const username = form.value.username;
    const password = form.value.password;

    if (username == '' || password == '') {
      this.errorMessage = 'Form error -> All fields are required!';
      this.setError(this.errorMessage);
      return
    }

    this.userService.login({ username, password }).subscribe({
      next: () => {
        this.router.navigate([this.activateRoute.snapshot.queryParams.redirectUrl || '/']);

      },
      error: error => {
        this.errorMessage = `Server error -> ${error.error}`;
        this.setError(this.errorMessage);
      }
    })

  }


}





