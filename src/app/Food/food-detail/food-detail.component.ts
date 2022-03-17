import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { FoodItem } from '../foodItem.model';
import { FoodItemService } from '../foodItem.service';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.css']
})
export class FoodDetailComponent implements OnInit, OnDestroy {
  foodItem: FoodItem;
  paramSub: Subscription;
  id: string;
  ready: boolean = false;
  userIsAuthenticated: boolean = false;

  name = "";
  brand = "";
  quantity = "";
  size = "";
  location = "";
  description = "";

  private authListenerSub: Subscription;

  constructor(private foodItemService: FoodItemService, private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.paramSub = this.route.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
        this.foodItemService.getItem(this.id).subscribe(foodData => {
            this.foodItem = {id: foodData.food._id, name: foodData.food.name, brand: foodData.food.brand, quantity: foodData.food.quantity, size: foodData.food.size, expDate: new Date(foodData.food.expDate), location: foodData.food.location, storageType: foodData.food.storageType, tags: foodData.food.tags};
            this.ready =true;
        });
      }
    );

    this.authListenerSub = this.authService.getAuthStatusListener().subscribe( isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });

    this.userIsAuthenticated = this.authService.getIsAuthenticated();
  }

  ngOnDestroy(): void {
    this.paramSub.unsubscribe();
    this.authListenerSub.unsubscribe();
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

}
