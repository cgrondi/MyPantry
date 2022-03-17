import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { FoodItem } from '../foodItem.model';
import { FoodItemService } from '../foodItem.service';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.css']
})
export class FoodItemComponent implements OnInit, OnDestroy {

  atOne = true;
  userIsAuthenticated: boolean = false;

  private authListenerSub: Subscription;

  @Input() item: FoodItem;
  @Input() index: number;

  constructor(private foodItemService: FoodItemService, private authService: AuthService) { }

  ngOnInit(): void {
    if (this.item.quantity > 0) {
      this.atOne = false;
    }

    this.authListenerSub = this.authService.getAuthStatusListener().subscribe( isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });

    this.userIsAuthenticated = this.authService.getIsAuthenticated();
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

  ngOnDestroy(): void {
      this.authListenerSub.unsubscribe();
  }

}
