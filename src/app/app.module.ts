import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule}  from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';


import { ReorderTags } from './Food/food-detail/reorderItems.pipe';
import { AuthComponent } from './auth/auth.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';


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
    ListTabComponent,
    AuthComponent,
    ErrorComponent,
    FilterPipe,
    FilterDatesPipe,
    ReorderTags
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent]
})
export class AppModule { }
