import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeAPIResponse, RecipeAPIRequest } from '../_interfaces/recipe.interface';

@Injectable({
  providedIn: 'root'
})

export class RecipeServiceService {
  URL: string = "http://localhost:8080/api/recipes";

  constructor(private http: HttpClient) { }


  getRecipes(): Observable<RecipeAPIResponse> {
    return this.http.get<RecipeAPIResponse>(this.URL);
  }
  getRecipesByCuisineType(cuisineType: string): Observable<RecipeAPIResponse> {
    let reqParams = new HttpParams();
    reqParams = reqParams.set("cuisineType", cuisineType);

    return this.http.get<RecipeAPIResponse>(this.URL + '/bycuisinetype', { params: reqParams });
  }

  getNextRecipes(url: string): Observable<RecipeAPIResponse> {
    return this.http.get<RecipeAPIResponse>(url);
  }

  saveRecipe(recipeData: any): Observable<any> {
    return this.http.post<any>(this.URL, recipeData);
  }

  likeRecipe(userId: string, recipeLabel: string, recipeData: any): Observable<any> {
    const body = { userId, recipeLabel, recipeData };
    return this.http.post<any>(this.URL, body);
  }
}
