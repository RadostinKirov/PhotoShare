import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from 'src/app/photo/content.service';
import { IPhoto } from 'src/app/shared/interfaces/photo';
import { UserService } from 'src/app/user/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  photo: IPhoto | undefined;
  errorMessage: string = '';
  time = 5;
  userInfo: any = this.userService.userInfo;
  detailsSubscription: any;
  likeSubscription: any;
  isAlreadyLiked: any;

  constructor(
    private contentService: ContentService,
    private activatedRoutes: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    this.fetchPhoto();
  }

  get isOwner() {
    const userId = this.userInfo._id;
    const photoOwnerId = this.photo?.owner;
    if (userId == photoOwnerId) {
      return true;
    }
    return false;
  }



  fetchPhoto(): void {
    this.photo = undefined;
    const id = this.activatedRoutes.snapshot.params.id;
    this.detailsSubscription = this.contentService.loadPhoto(id).subscribe({
      next: photo => {
        this.photo = photo;
        if (this.photo.usersLiked.includes(this.userInfo._id)) {
          this.isAlreadyLiked = true;
        } else {
          this.isAlreadyLiked = false;
        }
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

  like() {
    this.detailsSubscription.unsubscribe();
    console.log('like test')
    const photoId = this.photo?._id;
    const userId: string = this.userInfo._id;

    this.likeSubscription = this.contentService.like(userId, photoId!).subscribe({
      next: photo => {
        this.photo = photo;
        console.log(this.photo);
        if (this.photo?.usersLiked.includes(userId)) {
          this.isAlreadyLiked = true;
        } else {
          this.isAlreadyLiked = false;
        }
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

  delete() {
    const photoId = this.photo?._id;

    Swal.fire({
      title: 'Are you sure?',
      text: `${this.photo?.title} will be permanently deleted!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {

        this.contentService.delete(photoId!).subscribe({
          next: photo => {
            this.photo = photo;
        //    this.router.navigate(['/']);
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

        Swal.fire(
          'Deleted!',
          `${this.photo?.title} has been deleted.`,
          'success'
        )
        this.router.navigate(['/']);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          `${this.photo?.title} is safe :)`,
          'error'
        )
      }
    })
  }


}





