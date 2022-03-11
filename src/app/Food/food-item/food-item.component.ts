import { Component, Input, OnInit } from '@angular/core';
import { FoodItem } from '../foodItem.model';
import { FoodItemService } from '../foodItem.service';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.css']
})
export class FoodItemComponent implements OnInit {

  atOne = true;
  // word = 'search';

  @Input() item: FoodItem;
  @Input() index: number;

  constructor(private foodItemService: FoodItemService) { }

  ngOnInit(): void {
    if (this.item.quantity > 0) {
      this.atOne = false;
    }
  }

  onAdd() {
    if (this.item.quantity == 0) {
      this.atOne = false;
    }
    this.item.quantity += 1;
  }
  onSubtract() {
    if (this.item.quantity == 1) {
      this.atOne = true;
    }
    this.item.quantity -= 1;
  }

  onRemove() {
    this.foodItemService.deleteItem(this.index);
  }

  checkDate(date: Date) {
    return date < new Date();
  }

}
