import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeAPIResponse } from '../_interfaces/recipe.interface';

@Injectable({
  providedIn: 'root'
})

export class RecipeServiceService {
   URL: string = "http://localhost:8080/api/recipes";

  constructor(private http: HttpClient) { }


  getRecipes(): Observable<RecipeAPIResponse>{
    return this.http.get<RecipeAPIResponse>(this.URL);
  }

  getNextRecipes(url:string):Observable<RecipeAPIResponse> {
    return this.http.get<RecipeAPIResponse>(url);
  }

}
