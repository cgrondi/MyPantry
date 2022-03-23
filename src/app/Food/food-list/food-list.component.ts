import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
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
  itemsPerPage = 15;
  currentPage = 0;
  pageSizeOptions = [...new Set([5, 10, 15, 20, this.totalItems])];
  private activeTab: string;

  @Input() events: Observable<{name: string, value: number}>;

  searchfields: searchFields = new searchFields(null, null, null, null, null);

  private itemsChangedSub: Subscription;
  private infoSubscription: Subscription;
  private sortBySub: Subscription;
  private infoFilterDateSub: Subscription;



  constructor(private foodItemService: FoodItemService, private route: ActivatedRoute, private infoService: informationService) { }

  ngOnInit(): void {
    //  //  Initialize filterDate
    if (this.infoService.getFilterDate()) {
      this.filterDate = this.infoService.getFilterDate()
    }
    else {
      let today = new Date();
      this.filterDate = new Date(+today.getFullYear().toString(), today.getMonth(), today.getDate());
      this.infoService.setFilterDate(this.filterDate);
    }
    this.infoFilterDateSub = this.infoService.getFiltrDateListener().subscribe( newFilterDate => {
      this.filterDate = newFilterDate;
    })

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
        //  //  The following line that sets itemsPerPage kinda defeats the purpose of the paginator but I feel the site will work better.
        this.itemsPerPage = this.totalItems;
        this.pageSizeOptions = [...new Set([5, 10, 15, 20, this.totalItems])];
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

    this.sortBySub = this.events.subscribe( (sortByInfo) => {
      this.sortByName( sortByInfo.name, sortByInfo.value);
    })
  }

  setDate(form: NgForm) {
    let date = form.value.dateInput;
    let dateArray = date.split('-');
    this.filterDate = new Date(+dateArray[0], +dateArray[1] - 1, +dateArray[2]);
    this.infoService.setFilterDate(this.filterDate);
  }

  addClasses(itemDate: Date){
    const oneWeek = (this.filterDate.getTime() + 604800 * 1 * 1000);
    const twoWeeks = (this.filterDate.getTime() + 604800 * 2 * 1000);
    const threeWeeks = (this.filterDate.getTime() + 604800 * 3 * 1000);
    if(itemDate.getTime() < oneWeek){
      return 'red-box';
    }
    //If item date is less than two weeks after filter date AND greater than one week after filter date
    if(itemDate.getTime() < twoWeeks && itemDate.getTime() >= oneWeek){
      return 'orange-box';
    }
    //If item date is less than three weeks after filter date AND greater than two weeks after filter date
    if(itemDate.getTime() < threeWeeks && itemDate.getTime() >= twoWeeks){
      return 'yellow-box';
    }
    //If item date is greater than three weeks -- needed for consistant height for div, could replace.
    else{
      return 'clear-box';
    }
  }


  onPageChanged(pageData: PageEvent){
    this.currentPage = +pageData.pageIndex;
    this.itemsPerPage = pageData.pageSize;
    this.totalItems = this.foodItems.length;
    this.pageSizeOptions = [...new Set([5, 10, 15, 20, this.totalItems])];
    this.displayItems = this.foodItems.slice(this.itemsPerPage*(this.currentPage), (this.itemsPerPage*(this.currentPage+1)));
  }

  sortByName(sortOn: string, upOrDown: number){
    this.displayItems.sort(function(a,b) {
      if(sortOn === 'name' || sortOn === 'brand' || sortOn === 'size'){
        const nameA = a[sortOn].toUpperCase();
        const nameB = b[sortOn].toUpperCase();
        if(nameA < nameB){
          return -1 * upOrDown;
        }
        if(nameA > nameB){
          return 1 * upOrDown;
        }
        return 0;
      }
      if(sortOn === 'expDate' || sortOn === 'quantity'){
        const nameA = a[sortOn];
        const nameB = b[sortOn];
        if(nameA < nameB){
          return -1 * upOrDown;
        }
        if(nameA > nameB){
          return 1 * upOrDown;
        }
        return 0;
      }
    });
    this.displayItems = [...this.displayItems];
  }


  ngOnDestroy(): void {
    this.itemsChangedSub.unsubscribe();
    this.infoSubscription.unsubscribe();
    this.sortBySub.unsubscribe();
    this.infoFilterDateSub.unsubscribe();
  }
}
