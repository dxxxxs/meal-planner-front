import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeAPIResponse, RecipeAPIRequest, Recipe } from '../_interfaces/recipe.interface';
import { StorageServiceService } from './storage.service.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RecipeServiceService {
  URL: string = `${environment.API_BASE}/recipes`;

  constructor(private http: HttpClient, private storageService: StorageServiceService) { }


  getRecipes(): Observable<RecipeAPIResponse> {
    return this.http.get<RecipeAPIResponse>(this.URL);
  }
  getRecipesByCuisineType(cuisineType: string): Observable<RecipeAPIResponse> {
    let reqParams = new HttpParams();
    reqParams = reqParams.set("cuisineType", cuisineType);

    return this.http.get<RecipeAPIResponse>(this.URL + '/bycuisinetype', { params: reqParams });
  }
  getRecipesByMealType(mealtype: string[]): Observable<RecipeAPIResponse> {
    let reqParams = new HttpParams();
    mealtype.forEach(type => {
      reqParams = reqParams.append("mealType", type);
  });

    return this.http.get<RecipeAPIResponse>(this.URL + '/bymealtype', { params: reqParams });
  }
  getRecipesByText(mealtype: string[],query:string): Observable<RecipeAPIResponse> {
    let reqParams = new HttpParams();
    reqParams = reqParams.set("q",query);
    mealtype.forEach(type => {
      reqParams = reqParams.append("mealType", type);
  });

    return this.http.get<RecipeAPIResponse>(this.URL + '/bytext', { params: reqParams });
  }

  getNextRecipes(url: string): Observable<RecipeAPIResponse> {
    return this.http.get<RecipeAPIResponse>(url);
  }

  saveRecipe(recipeData: any): Observable<any> {
    const user = this.storageService.getUser();
    const token = this.storageService.getToken();


    if (!user || !token) {
      throw new Error('User not authenticated');
    }

    const body = {
      id: user.id,
      username: user.username,
      email: user.email,
      recipe: recipeData
    };

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(this.URL + '/saveRecipe', body, { headers: headers });
  }


  likeRecipe(recipeData: Recipe): Observable<any> {
    const user = this.storageService.getUser();
    const token = this.storageService.getToken();


    if (!user || !token) {
      throw new Error('User not authenticated');
    }

    const body = {
      id: user.id,
      username: user.username,
      email: user.email,
      recipe: recipeData
    };

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(this.URL + '/likeRecipe', body, { headers: headers });
  }

  recipeInLikes(recipeLabel: string): Observable<any> {
    const user = this.storageService.getUser();

    let reqParams = new HttpParams();
    reqParams = reqParams.set("recipeLabel", recipeLabel);
    reqParams = reqParams.set("id", user.id);

    return this.http.get(this.URL + '/recipeInLikes', { params: reqParams });
  }

  getRecipeById(recipeId:any):Observable<any>{

    let reqParams = new HttpParams();
    reqParams = reqParams.set("recipeId", recipeId);

    return this.http.get<any>(this.URL + '/recipeById', {params:reqParams});
  }

}
