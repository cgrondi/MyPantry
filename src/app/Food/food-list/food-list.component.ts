import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { informationService } from 'src/app/shared/information.service';
import { searchFields } from 'src/app/shared/search-box/search-fields.model';
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
  expirationMode: boolean;
  filterDate: Date;
  startDate: string;

  searchfields: searchFields = new searchFields(null, null, null, null, null);
  infoSubscription: Subscription;



  constructor(private foodItemService: FoodItemService, private route: ActivatedRoute, private infoService: informationService) { }

  ngOnInit(): void {
    if (this.infoService.getFilterDate()) {
      this.filterDate = this.infoService.getFilterDate()
    }
    else {
      let today = new Date();
      this.filterDate = new Date(+today.getFullYear().toString(), today.getMonth() + 1, today.getDate());
      // console.log('Food list initial filterDate: ' + this.filterDate);
      this.infoService.setFilterDate(this.filterDate);
    }

    this.startDate = this.filterDate.getFullYear().toString() + '-' + (this.filterDate.getMonth()).toString().padStart(2, '0') + '-' + this.filterDate.getDate().toString().padStart(2, '0');

    this.expirationMode = (this.route.toString()).includes('impendingExpiration')
    if ((this.route.toString()).includes('pantry')) {
      this.filterString = "Pantry";
    }
    else if ((this.route.toString()).includes('freezer')) {
      this.filterString = "Freezer";
    }
    else {
      // console.log("This route doesn't contain pantry nor freezer")
    }
    this.subscription = this.foodItemService.itemsChanged.subscribe(
      (foodItems: FoodItem[]) => {
        this.foodItems = foodItems;
      }
    )
    this.foodItemService.getItems();

    this.infoSubscription = this.infoService.searchFieldsChanged.subscribe(
      (searchFields: searchFields) => {
        this.searchfields = searchFields;
      }
    )
  }

  setDate(form: NgForm) {
    let date = form.value.dateInput;
    let dateArray = date.split('-');
    this.filterDate = new Date(+dateArray[0], +dateArray[1] - 1, +dateArray[2]);
    this.infoService.setFilterDate(this.filterDate);
    // console.log(this.filterDate)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.infoSubscription.unsubscribe();
  }

  compareDate(date: Date, numWeeks: number) {
    let compareDate = new Date(this.filterDate.getFullYear(), this.filterDate.getMonth(), this.filterDate.getDate() - 7 * numWeeks);
    // console.log(compareDate)
    if (date < compareDate) {
      return true;
    }
    else {
      return false;
    }
  }
}
