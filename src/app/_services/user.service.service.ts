import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageServiceService } from './storage.service.service';
import { Recipe } from '../_interfaces/recipe.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})



export class UserServiceService {

  API_URL: string = `${environment.API_BASE}/user/`;

  constructor(private http: HttpClient, private storageService: StorageServiceService) { }

  getUserLikes(): Observable<any> {
    const user = this.storageService.getUser();
    const token = this.storageService.getToken();

    if (!user || !token) {
      throw new Error('User not authenticated');
    }

    const reqParams = new HttpParams()
      .set("id", user.id)
      .set("username", user.username)
      .set("email", user.email);

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(this.API_URL + 'likes', { params: reqParams, headers: headers });
  }
}
