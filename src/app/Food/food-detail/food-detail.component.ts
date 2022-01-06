import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FoodItem } from '../foodItem.model';
import { FoodItemService } from '../foodItem.service';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit, OnDestroy {
  foodItem: FoodItem;
  subscription: Subscription;
  id: number;

  name = "";
  brand = "";
  quantity = "";
  size = "";
  location = "";
  description = "";

  constructor(private foodItemService: FoodItemService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.foodItem = this.foodItemService.getItem(this.id);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

}
