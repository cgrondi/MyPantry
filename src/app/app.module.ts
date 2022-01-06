import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PantryTabComponent } from './pantry-tab/pantry-tab.component';
import { FreezerTabComponent } from './freezer-tab/freezer-tab.component';
import { ImpendingExpirationTabComponent } from './impending-expiration-tab/impending-expiration-tab.component';
import { FoodItemComponent } from './Food/food-item/food-item.component';
import { FoodListComponent } from './Food/food-list/food-list.component';
import { FoodDetailComponent } from './Food/food-detail/food-detail.component';
import { SearchBoxComponent } from './shared/search-box/search-box.component';
import { AppRoutingModule } from './app-routing.module';
import { InfoStartComponent } from './shared/info-start/info-start.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { HeaderComponent } from './shared/header/header.component';
import { FoodEditComponent } from './Food/food-edit/food-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { FilterDatesPipe } from './filter-dates.pipe';
import { ListTabComponent } from './list-tab/list-tab.component';

@NgModule({
  declarations: [
    AppComponent,
    PantryTabComponent,
    FreezerTabComponent,
    ImpendingExpirationTabComponent,
    FoodItemComponent,
    FoodListComponent,
    FoodDetailComponent,
    SearchBoxComponent,
    InfoStartComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FoodEditComponent,
    FilterPipe,
    FilterDatesPipe,
    ListTabComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
