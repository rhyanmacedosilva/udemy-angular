import { Subject } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged: Subject<Recipe[]> = new Subject<Recipe[]>();

  // recipeSelected: EventEmitter<Recipe> = new EventEmitter<Recipe>()
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Butter Chicken',
  //     'Healthy version of your chicken curry.',
  //     'https://images.pexels.com/photos/5865467/pexels-photo-5865467.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  //     [
  //       new Ingredient('Skinless boneless chicken thighs', 500),
  //       new Ingredient('Large onion, chopped', 1)
  //     ]
  //   ),
  //   new Recipe(
  //     'Pancakes',
  //     'Learn a skill for life.',
  //     'https://images.pexels.com/photos/5865467/pexels-photo-5865467.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  //     [
  //       new Ingredient('Plain flour', 100),
  //       new Ingredient('Egg', 4)
  //     ]
  //   ),
  //   new Recipe(
  //     'Classic Lasagne',
  //     'Kids will love to help assemble this.',
  //     'https://images.pexels.com/photos/5865467/pexels-photo-5865467.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  //     [
  //       new Ingredient('Tomatoes', 1),
  //       new Ingredient('Carrot', 2)
  //     ]
  //   )
  // ];

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) { }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
