import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FoodItem } from '../foodItem.model';
import { FoodItemService } from '../foodItem.service';

@Component({
  selector: 'app-food-edit',
  templateUrl: './food-edit.component.html',
  styleUrls: ['./food-edit.component.css']
})
export class FoodEditComponent implements OnInit, OnDestroy {

  id: string;
  foodItem: FoodItem;
  foodForm: FormGroup;
  initialTags = [];
  editMode = false;
  isLoading = false;

  private paramSub: Subscription;
  private itemsStatusSub: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private foodItemService: FoodItemService) { }

  ngOnInit(): void {
    this.isLoading = true;

    this.paramSub = this.route.paramMap.subscribe( (paramMap: ParamMap) => {
      if(paramMap.has('id')){
        this.editMode = true;
        this.id = paramMap.get('id');
        this.foodItemService.getItem(this.id).subscribe(foodData => {
          this.isLoading = false;
          this.foodItem = {id: foodData.food._id, name: foodData.food.name, brand: foodData.food.brand, quantity: foodData.food.quantity, size: foodData.food.size, expDate: new Date(foodData.food.expDate), location: foodData.food.location, storageType: foodData.food.storageType, tags: foodData.food.tags}
          this.initForm();
        });
      }
      else{
        this.isLoading = false;
        this.editMode = false;
        this.id = null;
        this.initForm();
      }
    });

    this.itemsStatusSub = this.foodItemService.getItemsStatusListener().subscribe( itemsStatus => {
      this.isLoading = itemsStatus;
    })
  }

  initForm() {
    let name = '';
    let brand = '';
    let quantity = 0;
    let datestring = '';
    var d: Date = new Date(2020, 0, 1);
    let expDate = new Date();
    let size = '';
    let location = '';
    let storageType = 'pantry';
    let tags = new FormArray([]);

    if (this.editMode) {
      name = this.foodItem.name;
      brand = this.foodItem.brand;
      quantity = this.foodItem.quantity;
      d = this.foodItem.expDate;
      datestring = d.getFullYear().toString() + '-' + (d.getMonth() + 1).toString().padStart(2, '0') + '-' + d.getDate().toString().padStart(2, '0');
      size = this.foodItem.size;
      location = this.foodItem.location;
      storageType = this.foodItem.storageType;
      if (this.foodItem['tags']) {
        for (let tag of this.foodItem.tags) {
          tags.push(
            new FormControl(tag, Validators.required)
          );
        }
      }
    }
    this.foodForm = new FormGroup({
      'name': new FormControl(name, [Validators.required, Validators.maxLength(60)]),
      'brand': new FormControl(brand, [Validators.required, Validators.maxLength(60)]),
      'quantity': new FormControl(quantity, [Validators.required, Validators.min(0)]),
      'expDate': new FormControl(datestring, Validators.required),
      'size': new FormControl(size, [Validators.required, Validators.maxLength(60)]),
      'location': new FormControl(location, [Validators.required, Validators.maxLength(60)]),
      'storageType': new FormControl(storageType),
      'tags': tags
    });


  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSave() {
    this.isLoading = true;
    const dateOutput = this.foodForm.value.expDate;
    const newFoodItem = new FoodItem(this.foodForm.value.name, this.foodForm.value.brand, this.foodForm.value.quantity, this.foodForm.value.size, this.toDateObj(dateOutput), this.foodForm.value.location, this.foodForm.value.storageType, this.foodForm.value.tags, this.foodItem.id);
    this.foodItemService.updateItem(newFoodItem, this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onAddItem() {
    const dateOutput = this.foodForm.value.expDate;
    const newFoodItem = new FoodItem(this.foodForm.value.name, this.foodForm.value.brand, this.foodForm.value.quantity, this.foodForm.value.size, this.toDateObj(dateOutput), this.foodForm.value.location, this.foodForm.value.storageType, this.foodForm.value.tags, null);
    this.foodItemService.addItem(newFoodItem);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  //  //  Used by onAddItem due to that method utilizing the value of the form's date input element which gives the date in YYYY-MM-DD format.
  //  //  1 is subtracted from dateArray[1] due to date input month index starting at 1 and Date object month index starting at 0
  toDateObj(str: string) {
    let dateArray = (<string[]>str.split('-'));
    return new Date(+dateArray[0], +dateArray[1] - 1, +dateArray[2]);
  }

  onAddTag() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.foodForm.get('tags')).push(control);
  }

  onDeleteTag(index: number) {
    (<FormArray>this.foodForm.get('tags')).removeAt(index);
  }

  getControl() {
    return (<FormArray>this.foodForm.get('tags')).controls;
  }


  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
    this.itemsStatusSub.unsubscribe();
  }
}
