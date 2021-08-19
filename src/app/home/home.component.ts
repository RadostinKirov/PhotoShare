import { Component } from '@angular/core';
import { ContentService } from '../photo/content.service';
import { IPhoto } from '../shared/interfaces/photo';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-photo',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  photos: IPhoto[] | undefined;
  allPhotosSubscription: any;
  recentPhotosSubscription: any;
  mostLikedPhotosSubscription: any;
  collectionTitle: string = 'Checkout Our Last Uploads';

  constructor(
    private contentService: ContentService,
    private userService: UserService) {
    this.fetchPhotos();
  }
  
  get isLogged(): boolean {
    return this.userService.isLogged;
  }
 
  fetchPhotos() {
    this.photos = undefined;
    this.allPhotosSubscription = this.contentService.loadPhotos().subscribe(photos => this.photos = photos);
  }

  recent() {
    this.allPhotosSubscription.unsubscribe();

    if (this.mostLikedPhotosSubscription) {
      this.mostLikedPhotosSubscription.unsubscribe()
    };

    this.fetchPhotos();
    this.collectionTitle = 'Checkout Our Last Uploads';
  }

  mostLiked() {
    this.allPhotosSubscription.unsubscribe();

    this.mostLikedPhotosSubscription = this.contentService.loadMostLikedPhotos().subscribe(photos => this.photos = photos.slice(0,3));
    this.collectionTitle = 'Top 3 most liked photos';
  }

}
