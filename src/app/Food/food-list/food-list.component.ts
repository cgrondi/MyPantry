import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FoodItem } from '../foodItem.model';
import { FoodItemService } from '../foodItem.service';

@Component({
  selector: 'app-food-list',
  templateUrl: './food-list.component.html',
  styleUrls: ['./food-list.component.css']
})
export class FoodListComponent implements OnInit, OnDestroy {
  foodItems: FoodItem[] = [];
  subscription: Subscription;
  filterString = "";

  constructor(private foodItemService: FoodItemService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    if ((this.route.toString()).includes('pantry')) {
      this.filterString = "Pantry";
      // console.log("This url contains pantry");
    }
    else if ((this.route.toString()).includes('freezer')) {
      this.filterString = "Freezer";
      // console.log("This route contains freezer");
    }
    else {
      console.log("This route doesn't contain pantry nor freezer")
    }
    this.subscription = this.foodItemService.itemsChanged.subscribe(
      (foodItems: FoodItem[]) => {
        this.foodItems = foodItems;
      }
    )
    this.foodItems = this.foodItemService.getItems();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
