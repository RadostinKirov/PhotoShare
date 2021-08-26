import { Component} from '@angular/core';
import { IPhoto } from 'src/app/shared/interfaces/photo';
import { IUser } from 'src/app/shared/interfaces/user';
import { ContentService } from '../../photo/content.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  photos: IPhoto[] | undefined;
  userInfo: IUser | null = null;
  userId: string = '';
  photosCount: number = 0;
  likesCount: number = 0;


  constructor(
    private contentService: ContentService,
    private userService: UserService
  ) {
    this.fetchPhotos();
  }

  get username() {
    const userInfo: any = this.userService.userInfo;
    return userInfo.username;
  }
  
  fetchPhotos() {
    const userInfo: any = this.userService.userInfo;
    this.userId = userInfo._id;
    
    
    this.contentService.loadAllUserPhotos(this.userId).subscribe(photos => {
      this.photos = photos
      this.photosCount = photos.length;
      this.likesCount = photos.reduce((acc, curr) => acc + curr.likes, 0)
    console.log('likes -> ', this.likesCount)
    });
  }


}


