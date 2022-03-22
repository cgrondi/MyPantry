import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/auth/auth.service';
import { FoodItem } from '../foodItem.model';
import { FoodItemService } from '../foodItem.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-food-item',
  templateUrl: './food-item.component.html',
  styleUrls: ['./food-item.component.css']
})
export class FoodItemComponent implements OnInit, OnDestroy {

  userIsAuthenticated: boolean = false;

  private authListenerSub: Subscription;

  @Input() item: FoodItem;
  @Input() index: string;

  constructor(private foodItemService: FoodItemService, private authService: AuthService, private location: Location, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.authListenerSub = this.authService.getAuthStatusListener().subscribe( isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });

    this.userIsAuthenticated = this.authService.getIsAuthenticated();
  }

  onRemove() {
    if(this.location.path().includes(this.index)){
      this.router.navigate(['./'], {relativeTo: this.route});
    }
    this.foodItemService.deleteItem(this.index);
  }

  checkDate(date: Date) {
    return date < new Date();
  }

  ngOnDestroy(): void {
      this.authListenerSub.unsubscribe();
  }

}
