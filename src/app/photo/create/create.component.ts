import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ContentService } from 'src/app/photo/content.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  photo: any;
  errorMessage: string = '';
  time = 5;


  constructor(
    private contentService: ContentService,
    private userService: UserService,
    private router: Router
  ) { }

  create(form: NgForm): void {
    const title = form.value.title;
    const description = form.value.description;
    const imageUrl = form.value.imageUrl;
    const userInfo: any = this.userService.userInfo;
    const userId: string = userInfo._id;


    this.contentService.create({ title, description, imageUrl, owner: userId }).subscribe({
      next: photo => {
        this.photo = photo;
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
