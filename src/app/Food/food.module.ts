import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AngularMaterialModule } from "../angular-material.module";
import { FilterDatesPipe } from "../filter-dates.pipe";
import { FilterPipe } from "../filter.pipe";
import { ListTabComponent } from "./list-tab/list-tab.component";

import { FoodDetailComponent } from "./food-detail/food-detail.component";
import { ReorderTags } from "./food-detail/reorderItems.pipe";
import { FoodEditComponent } from "./food-edit/food-edit.component";
import { FoodItemComponent } from "./food-item/food-item.component";
import { FoodListComponent } from "./food-list/food-list.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";



@NgModule({
  declarations: [
    FoodItemComponent,
    FoodListComponent,
    FoodDetailComponent,
    FoodEditComponent,
    ListTabComponent,
    ReorderTags,
    FilterPipe,
    FilterDatesPipe,
  ],
  imports: [
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule,
    BrowserAnimationsModule
  ]
})
export class FoodModule {}
