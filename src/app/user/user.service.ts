import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';
import { IUser } from '../shared/interfaces/user';

const API_URL = environment.apiUrl;


@Injectable()
export class UserService {
  errorMessage: string = '';
  
  constructor(
    private http: HttpClient,
    private cookieService: CookieService) { }


  get isLogged(): boolean {
    return !!this.userInfo;
  }

  get userInfo(): IUser | null {
    const jwt = this.cookieService.get("SESSION_TOKEN");
    try {
      return jwtDecode(jwt);
    } catch (err) {
      return null;
    }
  }

  register(data: { username: string; password: string }) {
    return this.http.post<any>(`${API_URL}/auth/register`, data, { withCredentials: true });
  }

  login(data: { username: string, password: string }) {
    return this.http.post<any>(`${API_URL}/auth/login`, data, { withCredentials: true });
  }

  logout(): void {
    console.log('logout clicked')
    this.cookieService.deleteAll();
  }
}


