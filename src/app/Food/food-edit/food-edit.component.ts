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
  subscription: Subscription;
  editMode = false;
  isLoading = false;


  constructor(private router: Router, private route: ActivatedRoute, private foodItemService: FoodItemService) { }

  ngOnInit(): void {
    // this.id = this.route.snapshot.params['id'];
    // this.subscription = this.route.params.subscribe(
    //   (params: Params) => {
    //     if (params['id']) {
    //       this.id = params['id'];
    //       this.foodItem = this.foodItemService.getItem(this.id);
    //       console.log(this.id);
    //     }
    //     this.editMode = params['id'] != null;
    //     console.log(this.editMode);
    //   }
    // );
    console.log("Activated route as seen by food-edit component = " + this.route.toString())
    this.isLoading = true;
    this.subscription = this.route.paramMap.subscribe( (paramMap: ParamMap) => {
      console.log(this.route)
      if(paramMap.has('id')){
        console.log("ParamMap has id")
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
        console.log("ParamMap does not have id")
        this.editMode = false;
        this.id = null;
        this.initForm();
      }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
      // console.log('datestring ' + datestring);
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
    // new Date(d.getFullYear(), d.getMonth(), d.getDay())
    this.foodForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'brand': new FormControl(brand, Validators.required),
      'quantity': new FormControl(quantity, [Validators.required, Validators.min(0)]),
      'expDate': new FormControl(datestring, Validators.required),
      'size': new FormControl(size, Validators.required),
      'location': new FormControl(location, Validators.required),
      'storageType': new FormControl(storageType),
      'tags': tags
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onSave() {
    const dateOutput = this.foodForm.value.expDate;
    const newFoodItem = new FoodItem(this.foodForm.value.name, this.foodForm.value.brand, this.foodForm.value.quantity, this.foodForm.value.size, this.toDateObj(dateOutput), this.foodForm.value.location, this.foodForm.value.storageType, this.foodForm.value.tags, this.foodItem.id);
    this.foodItemService.updateItem(newFoodItem, this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }


  //IMPORTANT 03/11/2022
    //Currently passing in null for newFoodItem's id, this will need fixing!
  //IMPORTANT
  onAddItem() {
    const dateOutput = this.foodForm.value.expDate;
    console.log("dateOutput = " + dateOutput)
    // console.log(dateOutput)
    // this.toDateObj(dateOutput);
    // let dateArray = dateOutput.split('-');
    // console.log('dateOutput: ' + dateOutput);
    // console.log('dateArray: ' + dateArray[0]);
    // const newDate = new Date(dateArray[0], dateArray[1]-1, dateArray[2]);
    // console.log("OnAddItem Date: " + newDate);
    const newFoodItem = new FoodItem(this.foodForm.value.name, this.foodForm.value.brand, this.foodForm.value.quantity, this.foodForm.value.size, this.toDateObj(dateOutput), this.foodForm.value.location, this.foodForm.value.storageType, this.foodForm.value.tags, null);
    this.foodItemService.addItem(newFoodItem);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  //necessary for onAddItem as that is the only time(I hope) we get the date from date input which gives us YYYY-MM-DD
    //format. Important to remember that we must subtract one from the month as date input is 1 indexed and Date
    //object months are 0 indexed.
  toDateObj(str: string) {
    console.log("Input = " + str);
    let dateArray = (<string[]>str.split('-'));
    console.log('dateArray = ')
    console.log(dateArray)
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

}
