import { Component } from '@angular/core';
import { NgForm, NgModelGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: any;
  errorMessage: string = '';
  time = 5;

  constructor(
    private userService: UserService,
    private router: Router) { }

  register(form: NgForm) {
    const username = form.value.username;
    const password = form.value.passwordsInput.password
    console.log('test')
    this.userService.register({ username, password }).subscribe({
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
    });
  }
}
