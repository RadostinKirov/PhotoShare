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
  errorMessage: string = '';
  time = 5;

  constructor(
    private userService: UserService,
    private router: Router) { }


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

  
  register(form: NgForm) {
    const username = form.value.username;
    const password = form.value.passwordsInput.password
    console.log('is username empty string -> ', username == '');
    console.log('is password empty string -> ', password == '');

    if (username == '' || password == '') {
      this.errorMessage = 'Form error -> All fields are required!';
      this.setError(this.errorMessage);
      return
    }
    console.log('test')
    this.userService.register({ username, password }).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: error => {
        this.errorMessage =`Server error -> ${error.error}`;
        this.setError(this.errorMessage);
      }
    });
  }


}
