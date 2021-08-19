import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from '../content.service';
import { IPhoto } from 'src/app/shared/interfaces/photo';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  photo: IPhoto | undefined;
  errorMessage: string = '';
  time = 5;

  constructor(
    private contentService: ContentService,
    private activatedRoutes: ActivatedRoute,
    private router: Router
  ) {
    this.fetchPhoto();
  }


  fetchPhoto(): void {
    this.photo = undefined;
    const id = this.activatedRoutes.snapshot.params.id;
    this.contentService.loadPhoto(id).subscribe(photo => this.photo = photo);
  }

  edit(form: NgForm) {
    const title = form.value.title;
    const description = form.value.description;
    const imageUrl = form.value.imageUrl;
    const photoId = this.activatedRoutes.snapshot.params.id;

    this.contentService.edit({ title, description, imageUrl, photoId}).subscribe({
      next: photo => {
        this.photo = photo;
        this.router.navigate([`/details/${photo._id}`]);
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
