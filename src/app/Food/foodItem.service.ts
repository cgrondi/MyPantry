import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { FoodItem } from "./foodItem.model";
import { map } from 'rxjs/operators'
import { Router } from "@angular/router";
import { informationService } from "../shared/information.service";



@Injectable({ providedIn: 'root' })
export class FoodItemService implements OnInit {

    itemsChanged = new Subject<FoodItem[]>();
    nextId: number;
    private items: FoodItem[];
    // private items: FoodItem[] = [
    //     new FoodItem(
    //         "Chicken Broth",
    //         "To be determined",
    //         36,
    //         "TBD",
    //         new Date(2022, 1, 1),
    //         "TBD",
    //         "Pantry",
    //         ["Chicken", "Broth", "Cans"],
    //         0
    //     ),
    //     new FoodItem(
    //         "Corn",
    //         "TBD",
    //         12,
    //         "15oz",
    //         new Date(2022, 0, 31),
    //         "TBD",
    //         "Freezer",
    //         ["Corn", "Cans", "Test", "Test", "Test", "Test", "Test", "Test", "Test", "Test", "Test", "Final"],
    //         1
    //     ),
    //     new FoodItem(
    //         "Cream of mushroom soup",
    //         "TBD",
    //         18,
    //         "TBD",
    //         new Date(2022, 0, 30),
    //         "TBD",
    //         "Pantry",
    //         ["Cream", "Mushroom", "Cans", "Soup"],
    //         2
    //     ),
    //     new FoodItem(
    //         "Cream of chicken soup",
    //         "TBD",
    //         18,
    //         "TBD",
    //         new Date(2022, 0, 25),
    //         "TBD",
    //         "Pantry",
    //         ["Cream", "Chicken", "Cans", "Soup"],
    //         3
    //     ),
    //     new FoodItem(
    //         "Green Beans (Kitchen sliced)",
    //         "Green Giant",
    //         4,
    //         "TBD",
    //         new Date(2022, 0, 24),
    //         "TBD",
    //         "Pantry",
    //         ["Green Beans", "Cans"],
    //         4
    //     ),
    //     new FoodItem(
    //         "Green Beans (Italian)",
    //         "TBD",
    //         11,
    //         "28oz",
    //         new Date(2022, 0, 23),
    //         "TBD",
    //         "Pantry",
    //         ["Green Beans", "Cans"],
    //         5
    //     ),
    //     new FoodItem(
    //         "Green Beans",
    //         "Makers Mark",
    //         9,
    //         "14.5oz",
    //         new Date(2022, 0, 18),
    //         "TBD",
    //         "Pantry",
    //         ["Green Beans", "Cans"],
    //         6
    //     ),
    //     new FoodItem(
    //         "Grape Jelly",
    //         "TBD",
    //         4,
    //         "30oz",
    //         new Date(2022, 0, 17),
    //         "TBD",
    //         "Pantry",
    //         ["Grape", "Jelly"],
    //         7
    //     ),
    //     new FoodItem(
    //         "Strawberry Jelly",
    //         "TBD",
    //         2,
    //         "32oz",
    //         new Date(2022, 0, 16),
    //         "TBD",
    //         "Pantry",
    //         ["Strawberry", "Jelly"],
    //         8
    //     ),
    //     new FoodItem(
    //         "Pickles (Kosher Dill Spears)",
    //         "TBD",
    //         1,
    //         "1 Gallon",
    //         new Date(2020, 0, 1),
    //         "TBD",
    //         "Pantry",
    //         ["Pickles", "Spears", "Green"],
    //         9
    //     ),
    //     new FoodItem(
    //         "Pickles (Thin Dill Chips)",
    //         "TBD",
    //         2,
    //         "1 Gallon",
    //         new Date(2020, 0, 1),
    //         "TBD",
    //         "Pantry",
    //         ["Pickles", "Chips", "Green"],
    //         10
    //     ),
    //     new FoodItem(
    //         "Refried Beans",
    //         "TBD",
    //         6,
    //         "16oz",
    //         new Date(2020, 0, 1),
    //         "TBD",
    //         "Pantry",
    //         ["Refried Beans", "Cans", "Beans", "Taco"],
    //         11
    //     ),
    //     new FoodItem(
    //         "Spaghetti Sauce",
    //         "Prego",
    //         4,
    //         "45oz",
    //         new Date(2020, 0, 1),
    //         "TBD",
    //         "Pantry",
    //         ["Spaghetti", "Jars", "Sauce"],
    //         12
    //     ),
    //     new FoodItem(
    //         "Spaghettio's with meatballs",
    //         "TBD",
    //         10,
    //         "15.6oz",
    //         new Date(2020, 0, 1),
    //         "TBD",
    //         "Pantry",
    //         ["Spaghettio's", "Cans", "Dad Approved"],
    //         13
    //     ),
    //     new FoodItem(
    //         "Tomato Sauce",
    //         "TBD",
    //         6,
    //         "TBD",
    //         new Date(2020, 0, 1),
    //         "TBD",
    //         "Pantry",
    //         ["Tomato Sauce", "Cans", "Sauce"],
    //         14
    //     ),
    //     new FoodItem(
    //         "Tomatoes (Diced and Crushed)",
    //         "TBD",
    //         8,
    //         "TBD",
    //         new Date(2020, 0, 1),
    //         "TBD",
    //         "Pantry",
    //         ["Tomatoes", "Cans"],
    //         15
    //     ),
    //     new FoodItem(
    //         "Tuna",
    //         "TBD",
    //         36,
    //         "TBD",
    //         new Date(2020, 0, 1),
    //         "TBD",
    //         "Pantry",
    //         ["Tuna", "Fish", "Cans"],
    //         16
    //     )
    // ];
    private URL = environment.apiUrl + '/food';

    constructor(private http: HttpClient, private router: Router, private infoService: informationService){}

    ngOnInit(): void {
        this.nextId = this.items.length + 1;
        console.log("(foodItem.service)next id = " + this.nextId);
    }


    getItems(filterString: string) {
      console.log('getItems receives: ' + filterString);
      const queryParams = `?filterString=${filterString}`;
      this.http.get<{message: string, food: any}>(this.URL + queryParams)
      .pipe(map(foodData => {
        return foodData.food.map(foodItem => {
          return {
            name: foodItem.name,
            brand: foodItem.brand,
            quantity: foodItem.quantity,
            size: foodItem.size,
            expDate: new Date((foodItem.expDate)),
            // expDate: foodItem.expDate,
            location: foodItem.location,
            storageType: foodItem.storageType,
            tags: foodItem.tags,
            id: foodItem._id
          }
        })
      }))
      .subscribe((transformedFood) => {
        this.items = transformedFood;
        console.log('Food Service sends out this array: ')
        console.log(this.items)
        this.itemsChanged.next([...this.items]);
      }, err => {
        console.log(err);
      });
      // .subscribe((response) => {
      //   console.log(response.food)
      //   this.items = response.food;
      //   this.itemsChanged.next([...this.items]);
      // });
    }

    getItem(id: string) {
      // return {...this.items.find(f => f.id === id)};
      return this.http.get<{ food: {_id: string, name: string, brand: string, quantity: number, size: string, expDate:string, location: string, storageType: string, tags: string[]}}>(this.URL + '/' + id)
    }

    addItem(foodItem: FoodItem) {
        // this.items.push(foodItem);
        const postItem = {
          name: foodItem.name,
          brand: foodItem.brand,
          quantity: foodItem.quantity,
          size: foodItem.size,
          expDate: foodItem.expDate.toISOString(),
          location: foodItem.location,
          storageType: foodItem.storageType,
          tags: foodItem.tags,
          id: foodItem.id
        }
        this.http.post<{message: string}>(this.URL, postItem)
          .subscribe(responseData => {
            this.itemsChanged.next(this.items.slice());
            // this.nextId += 1;
            this.getItems(this.infoService.getActiveTab());
            console.log(responseData.message);
          }, err => {
            console.log(err);
          });
    }

    updateItem(newItem: FoodItem, index: string) {
      const postItem = {
        name: newItem.name,
        brand: newItem.brand,
        quantity: newItem.quantity,
        size: newItem.size,
        expDate: newItem.expDate.toISOString(),
        location: newItem.location,
        storageType: newItem.storageType,
        tags: newItem.tags,
        id: newItem.id
      }
      this.http.put<{message: string}>(this.URL + '/' + index, postItem)
        .subscribe(result => {
          console.log(result);
          const updatedItems = [...this.items];
          const oldItemIndex = updatedItems.findIndex(f => f.id === postItem.id);
          updatedItems[oldItemIndex] = newItem;
          this.items = updatedItems;
          this.itemsChanged.next([...this.items]);
          // this.router.navigate(['/']);   //I go back and forth on whether this should be here. Future Cameron's problem
        })
    }

    deleteItem(index: number) {
        this.http.delete(this.URL + '/' + index)
          .subscribe( () => {
            this.getItems(this.infoService.getActiveTab());
            console.log("Deleted!");
          })
    }
}
