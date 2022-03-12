import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FoodItemComponent } from './Food/food-item/food-item.component';
import { FoodListComponent } from './Food/food-list/food-list.component';
import { FoodDetailComponent } from './Food/food-detail/food-detail.component';
import { SearchBoxComponent } from './shared/search-box/search-box.component';
import { AppRoutingModule } from './app-routing.module';
import { InfoStartComponent } from './shared/info-start/info-start.component';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { HeaderComponent } from './shared/header/header.component';
import { FoodEditComponent } from './Food/food-edit/food-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './filter.pipe';
import { FilterDatesPipe } from './filter-dates.pipe';
import { ListTabComponent } from './list-tab/list-tab.component';
// import { NoopAnimationsModule } from '@angular/platform-browser/animations'; //?

import { HttpClientModule } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule}  from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'


import { ReorderTags } from './Food/food-detail/reorderItems.pipe';

@NgModule({
  declarations: [
    AppComponent,
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
    ListTabComponent,
    ReorderTags
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    // NoopAnimationsModule, //?
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
