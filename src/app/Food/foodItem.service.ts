import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { FoodItem } from "./foodItem.model";

@Injectable({ providedIn: 'root' })
export class FoodItemService implements OnInit {

    itemsChanged = new Subject<FoodItem[]>();
    nextId: number;
    private items: FoodItem[] = [
        new FoodItem(
            "Chicken Broth",
            "To be determined",
            36,
            "TBD",
            new Date(2022, 1, 1),
            "TBD",
            "Pantry",
            ["Chicken", "Broth", "Cans"],
            0
        ),
        new FoodItem(
            "Corn",
            "TBD",
            12,
            "15oz",
            new Date(2022, 0, 31),
            "TBD",
            "Freezer",
            ["Corn", "Cans", "Test", "Test", "Test", "Test", "Test", "Test", "Test", "Test", "Test", "Final"],
            1
        ),
        new FoodItem(
            "Cream of mushroom soup",
            "TBD",
            18,
            "TBD",
            new Date(2022, 0, 30),
            "TBD",
            "Pantry",
            ["Cream", "Mushroom", "Cans", "Soup"],
            2
        ),
        new FoodItem(
            "Cream of chicken soup",
            "TBD",
            18,
            "TBD",
            new Date(2022, 0, 25),
            "TBD",
            "Pantry",
            ["Cream", "Chicken", "Cans", "Soup"],
            3
        ),
        new FoodItem(
            "Green Beans (Kitchen sliced)",
            "Green Giant",
            4,
            "TBD",
            new Date(2022, 0, 24),
            "TBD",
            "Pantry",
            ["Green Beans", "Cans"],
            4
        ),
        new FoodItem(
            "Green Beans (Italian)",
            "TBD",
            11,
            "28oz",
            new Date(2022, 0, 23),
            "TBD",
            "Pantry",
            ["Green Beans", "Cans"],
            5
        ),
        new FoodItem(
            "Green Beans",
            "Makers Mark",
            9,
            "14.5oz",
            new Date(2022, 0, 18),
            "TBD",
            "Pantry",
            ["Green Beans", "Cans"],
            6
        ),
        new FoodItem(
            "Grape Jelly",
            "TBD",
            4,
            "30oz",
            new Date(2022, 0, 17),
            "TBD",
            "Pantry",
            ["Grape", "Jelly"],
            7
        ),
        new FoodItem(
            "Strawberry Jelly",
            "TBD",
            2,
            "32oz",
            new Date(2022, 0, 16),
            "TBD",
            "Pantry",
            ["Strawberry", "Jelly"],
            8
        ),
        new FoodItem(
            "Pickles (Kosher Dill Spears)",
            "TBD",
            1,
            "1 Gallon",
            new Date(2020, 0, 1),
            "TBD",
            "Pantry",
            ["Pickles", "Spears", "Green"],
            9
        ),
        new FoodItem(
            "Pickles (Thin Dill Chips)",
            "TBD",
            2,
            "1 Gallon",
            new Date(2020, 0, 1),
            "TBD",
            "Pantry",
            ["Pickles", "Chips", "Green"],
            10
        ),
        new FoodItem(
            "Refried Beans",
            "TBD",
            6,
            "16oz",
            new Date(2020, 0, 1),
            "TBD",
            "Pantry",
            ["Refried Beans", "Cans", "Beans", "Taco"],
            11
        ),
        new FoodItem(
            "Spaghetti Sauce",
            "Prego",
            4,
            "45oz",
            new Date(2020, 0, 1),
            "TBD",
            "Pantry",
            ["Spaghetti", "Jars", "Sauce"],
            12
        ),
        new FoodItem(
            "Spaghettio's with meatballs",
            "TBD",
            10,
            "15.6oz",
            new Date(2020, 0, 1),
            "TBD",
            "Pantry",
            ["Spaghettio's", "Cans", "Dad Approved"],
            13
        ),
        new FoodItem(
            "Tomato Sauce",
            "TBD",
            6,
            "TBD",
            new Date(2020, 0, 1),
            "TBD",
            "Pantry",
            ["Tomato Sauce", "Cans", "Sauce"],
            14
        ),
        new FoodItem(
            "Tomatoes (Diced and Crushed)",
            "TBD",
            8,
            "TBD",
            new Date(2020, 0, 1),
            "TBD",
            "Pantry",
            ["Tomatoes", "Cans"],
            15
        ),
        new FoodItem(
            "Tuna",
            "TBD",
            36,
            "TBD",
            new Date(2020, 0, 1),
            "TBD",
            "Pantry",
            ["Tuna", "Fish", "Cans"],
            16
        )
    ];


    ngOnInit(): void {
        this.nextId = this.items.length + 1;
        console.log("(foodItem.service)next id = " + this.nextId);
    }



    getItems() {
        return this.items.slice();
    }

    getItem(index: number) {
        return this.items[index];
    }

    addItem(foodItem: FoodItem) {
        this.items.push(foodItem);
        this.itemsChanged.next(this.items.slice());
        this.nextId += 1;
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