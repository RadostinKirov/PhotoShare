import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPhoto } from '../shared/interfaces/photo';
import { environment } from '../../environments/environment';
const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }

  loadPhotos() {
    return this.http.get<IPhoto[]>(`${API_URL}`);
  }
  
  loadAllUserPhotos(userId:string) {
    return this.http.post<IPhoto[]>(`${API_URL}/photo/profilePhotos/${userId}`, {userId});
  }

  loadRecentPhotos() {
    return this.http.get<IPhoto[]>(`${API_URL}/photo/recent`);
  }

  loadMostLikedPhotos(){
    return this.http.get<IPhoto[]>(`${API_URL}/photo/mostLiked`);
  }

  loadPhoto(id: string) {
    return this.http.get<IPhoto>(`${API_URL}/photo/details/${id}`);
  }

  create(data: { title: string, description: string, imageUrl: string, owner: string }) {
    console.log('data -> ', data)
    return this.http.post<any>(`${API_URL}/photo/create`, data, { withCredentials: true });
  }

  edit(data: { title: string, description: string, imageUrl: string, photoId: string }) {
    return this.http.post<any>(`${API_URL}/photo/edit/${data.photoId}`, data, { withCredentials: true });
  }

  like(userId:string, photoId:string){
    return this.http.post<any>(`${API_URL}/photo/like/${photoId}`, {userId, photoId}, { withCredentials: true });
  }

  delete(photoId: string) {
    return this.http.post<any>(`${API_URL}/photo/delete/${photoId}`, photoId, { withCredentials: true });

  }
}
