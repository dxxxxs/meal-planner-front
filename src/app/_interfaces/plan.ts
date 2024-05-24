import { Recipe } from "./recipe.interface";

export interface Plan {
    _id: string,
    userId: string,
    date: string,
    breakfast: [PlanObject],
    snack: [PlanObject],
    lunch: [PlanObject],
    teatime: [PlanObject],
    dinner: [PlanObject]
}

export interface PlanObject {
    quantity: number,
    _id?: string,    //PlanObjectID
    recipe: string, //RecipeID
    recipeData?: Recipe
}

export interface Macros{
    meal:string,
    calories:number,
    carbs:number,
    proteins:number,
    fats:number
}