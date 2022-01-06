import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { FoodItem } from "./foodItem.model";

@Injectable({ providedIn: 'root' })
export class FoodItemService {

    itemsChanged = new Subject<FoodItem[]>();

    private items: FoodItem[] = [
        new FoodItem(
            "Chicken Broth",
            "To be determined",
            36,
            "TBD",
            new Date(2020, 0, 1),
            "TBD",
            "Pantry",
            ["Chicken", "Broth", "Cans"]
        ),
        new FoodItem(
            "Corn",
            "TBD",
            12,
            "15oz",
            new Date(2020, 0, 1),
            "TBD",
            "Freezer",
            ["Corn", "Cans", "Test", "Test", "Test", "Test", "Test", "Test", "Test", "Test", "Test", "Final"]
        ),
        new FoodItem(
            "Cream of mushroom soup",
            "TBD",
            18,
            "TBD",
            new Date(2020, 0, 1),
            "TBD",
            "Pantry",
            ["Cream", "Mushroom", "Cans", "Soup"]
        ),
        new FoodItem(
            "Cream of chicken soup",
            "TBD",
            18,
            "TBD",
            new Date(2020, 0, 1),
            "TBD",
            "Pantry",
            ["Cream", "Chicken", "Cans", "Soup"]
        ),
        new FoodItem(
            "Green Beans (Kitchen sliced)",
            "Green Giant",
            4,
            "TBD",
            new Date(2020, 0, 1),
            "TBD",
            "Pantry",
            ["Green Beans", "Cans"]
        ),
        new FoodItem(
            "Green Beans (Italian)",
            "TBD",
            11,
            "28oz",
            new Date(2020, 0, 1),
            "TBD",
            "Pantry",
            ["Green Beans", "Cans"]
        ),
        new FoodItem(
            "Green Beans",
            "Makers Mark",
            9,
            "14.5oz",
            new Date(2020, 0, 1),
            "TBD",
            "Pantry",
            ["Green Beans", "Cans"]
        ),
        new FoodItem(
            "Grape Jelly",
            "TBD",
            4,
            "30oz",
            new Date(2020, 0, 1),
            "TBD",
            "Pantry",
            ["Grape", "Jelly"]
        ),
        new FoodItem(
            "Strawberry Jelly",
            "TBD",
            2,
            "32oz",
            new Date(2020, 0, 1),
            "TBD",
            "Pantry",
            ["Strawberry", "Jelly"]
        ),
        new FoodItem(
            "Pickles (Kosher Dill Spears)",
            "TBD",
            1,
            "1 Gallon",
            new Date(2020, 0, 1),
            "TBD",
            "Pantry",
            ["Pickles", "Spears", "Green"]
        ),
        new FoodItem(
            "Pickles (Thin Dill Chips)",
            "TBD",
            2,
            "1 Gallon",
            new Date(2020, 0, 1),
            "TBD",
            "Pantry",
            ["Pickles", "Chips", "Green"]
        ),
        new FoodItem(
            "Refried Beans",
            "TBD",
            6,
            "16oz",
            new Date(2020, 0, 1),
            "TBD",
            "Pantry",
            ["Refried Beans", "Cans", "Beans", "Taco"]
        ),
        new FoodItem(
            "Spaghetti Sauce",
            "Prego",
            4,
            "45oz",
            new Date(2020, 0, 1),
            "TBD",
            "Pantry",
            ["Spaghetti", "Jars", "Sauce"]
        ),
        new FoodItem(
            "Spaghettio's with meatballs",
            "TBD",
            10,
            "15.6oz",
            new Date(2020, 0, 1),
            "TBD",
            "Pantry",
            ["Spaghettio's", "Cans", "Dad Approved"]
        ),
        new FoodItem(
            "Tomato Sauce",
            "TBD",
            6,
            "TBD",
            new Date(2020, 0, 1),
            "TBD",
            "Pantry",
            ["Tomato Sauce", "Cans", "Sauce"]
        ),
        new FoodItem(
            "Tomatoes (Diced and Crushed)",
            "TBD",
            8,
            "TBD",
            new Date(2020, 0, 1),
            "TBD",
            "Pantry",
            ["Tomatoes", "Cans"]
        ),
        new FoodItem(
            "Tuna",
            "TBD",
            36,
            "TBD",
            new Date(2020, 0, 1),
            "TBD",
            "Pantry",
            ["Tuna", "Fish", "Cans"]
        )
    ];

    getItems() {
        return this.items.slice();
    }

    getItem(index: number) {
        return this.items[index];
    }

    addItem(foodItem: FoodItem) {
        this.items.push(foodItem);
        this.itemsChanged.next(this.items.slice());
    }

    updateItem(newItem: FoodItem, index: number) {
        this.items[index] = newItem;
        this.itemsChanged.next(this.items.slice());
    }

    deleteItem(index: number) {
        this.items.splice(index, 1);
        this.itemsChanged.next(this.items.slice());
    }
}