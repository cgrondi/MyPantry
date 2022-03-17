import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
  displayItems: FoodItem[] = [];
  filterString = "";
  isLoading: boolean = false;
  expirationMode: boolean;
  filterDate: Date;
  totalItems = 4;
  itemsPerPage = 3;
  currentPage = 0;
  pageSizeOptions = [...new Set([1, 2, 4, 6, 10, 20, this.totalItems])];  //When update options also change in itemsChanged sub and onPageChanged
  private activeTab: string;

  searchfields: searchFields = new searchFields(null, null, null, null, null);

  itemsChangedSub: Subscription;
  infoSubscription: Subscription;



  constructor(private foodItemService: FoodItemService, private route: ActivatedRoute, private infoService: informationService) { }

  ngOnInit(): void {
    //  //  Initialize filterDate
    if (this.infoService.getFilterDate()) {
      this.filterDate = this.infoService.getFilterDate()
    }
    else {
      let today = new Date();
      this.filterDate = new Date(+today.getFullYear().toString(), today.getMonth() + 1, today.getDate());
      this.infoService.setFilterDate(this.filterDate);
    }

    //  //  Set up subscription to paramMap for setting activeTab and filterstring
    this.route.paramMap.subscribe( (paramMap: ParamMap) => {
      if(paramMap.has('tab')){
        this.expirationMode = (paramMap.get('tab') === 'impendingExpiration');
        if(this.activeTab != paramMap.get('tab')){
          this.isLoading = true;
          this.infoService.setActiveTab(paramMap.get('tab'));
          this.currentPage = 0;
          if(paramMap.get('tab') != 'impendingExpiration'){
            this.filterString = paramMap.get('tab');
            this.filterString = this.filterString.charAt(0).toUpperCase() + this.filterString.slice(1);
            this.activeTab = paramMap.get('tab');
            this.foodItemService.getItems(this.activeTab);
          }
          else{
              this.activeTab = 'impendingExpiration';
              this.foodItemService.getItems('');
            }
          }
      }
    })

    this.isLoading = true;
    //  //  Set up subscription to foodItemsService for when list of foodItems changes
    this.itemsChangedSub = this.foodItemService.getItemsUpdatedListener().subscribe(
      (foodItems: FoodItem[]) => {
        this.isLoading = false;
        this.foodItems = foodItems;
        this.totalItems = this.foodItems.length;
        this.pageSizeOptions = [...new Set([1, 2, 4, 6, 10, 20, this.totalItems])];
        this.displayItems = this.foodItems.slice(this.itemsPerPage*(this.currentPage), (this.itemsPerPage*(this.currentPage+1)));
      }
    )

    //  //  Check if activeTab is impendingExpiration and if so get all items, else get items that belong to that tab
        //  //  Set activeTab in infoService
    if(this.activeTab){
      if(this.activeTab === "impendingExpiration"){
        this.foodItemService.getItems('');
      }
      else{
        this.foodItemService.getItems(this.activeTab);
      }
      this.infoService.setActiveTab(this.activeTab);
    }

    //  //  Set subscription to infoService for changing searchFields
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
  }

  compareDate(date: Date, numWeeks: number) {
    let compareDate = new Date(this.filterDate.getFullYear(), this.filterDate.getMonth(), this.filterDate.getDate() - 7 * numWeeks);
    if (date < compareDate) {
      return true;
    }
    else {
      return false;
    }
  }

  onPageChanged(pageData: PageEvent){
    this.currentPage = +pageData.pageIndex;
    this.itemsPerPage = pageData.pageSize;
    this.totalItems = this.foodItems.length;  //? Should this be displayItems.length
    this.pageSizeOptions = [...new Set([1, 2, 4, 6, 10, 20, this.totalItems])];
    this.displayItems = this.foodItems.slice(this.itemsPerPage*(this.currentPage), (this.itemsPerPage*(this.currentPage+1)));
    const test: number = pageData.pageIndex + 1
  }


  ngOnDestroy(): void {
    this.itemsChangedSub.unsubscribe();
    this.infoSubscription.unsubscribe();
  }
}
