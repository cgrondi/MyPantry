import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { FoodItem } from "./foodItem.model";
import { map } from 'rxjs/operators'
import { Router } from "@angular/router";
import { informationService } from "../shared/information.service";



@Injectable({ providedIn: 'root' })
export class FoodItemService {

    private itemsChanged = new Subject<FoodItem[]>();
    private itemsStatusListener = new Subject<boolean>();
    private items: FoodItem[];
    private URL = environment.apiUrl + '/food';

    constructor(private http: HttpClient, private router: Router, private infoService: informationService){}

    getItemsUpdatedListener(){
      return this.itemsChanged.asObservable();
    }

    getItemsStatusListener(){
      return this.itemsStatusListener.asObservable();
    }


    getItems(filterString: string) {
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
            location: foodItem.location,
            storageType: foodItem.storageType,
            tags: foodItem.tags,
            id: foodItem._id
          }
        })
      }))
      .subscribe((transformedFood) => {
        this.items = transformedFood;
        this.itemsChanged.next([...this.items]);
      }, err => {
        console.log(err);
      });
    }

    getItem(id: string) {
      return this.http.get<{ food: {_id: string, name: string, brand: string, quantity: number, size: string, expDate:string, location: string, storageType: string, tags: string[]}}>(this.URL + '/' + id)
    }

    addItem(foodItem: FoodItem) {
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
        }, error => {
          this.itemsStatusListener.next(false);
        })
    }

    deleteItem(index: number) {
        this.http.delete(this.URL + '/' + index)
          .subscribe( () => {
            this.getItems(this.infoService.getActiveTab());
          })
    }
}
