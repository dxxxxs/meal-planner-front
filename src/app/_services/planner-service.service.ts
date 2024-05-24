import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageServiceService } from './storage.service.service';
import { Observable } from 'rxjs';
import { Recipe } from '../_interfaces/recipe.interface';
import { Plan } from '../_interfaces/plan';

@Injectable({
  providedIn: 'root'
})
export class PlannerServiceService {

  URL: string = "http://localhost:8080/api/planner/";

  constructor(private http: HttpClient, private storageService: StorageServiceService) { }

  updatePlanner(plan: Plan): Observable<any> {
    const user = this.storageService.getUser();
    const token = this.storageService.getToken();


    if (!user || !token) {
      throw new Error('User not authenticated');
    }

    const body = {
      userId: user.id,
      date:plan.date,
      breakfast: plan.breakfast,
      snack: plan.snack,
      lunch: plan.lunch,
      teatime: plan.teatime,
      dinner: plan.dinner
    };

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(this.URL, body, { headers: headers });
  }

  getPlanner(date: string): Observable<any> {
    const user = this.storageService.getUser();
    const token = this.storageService.getToken();

    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    let reqParams = new HttpParams();
    reqParams = reqParams.set("date", date);
    reqParams = reqParams.set("userId", user.id);

    return this.http.get<any>(this.URL, { params: reqParams, headers: headers });
  }
}
