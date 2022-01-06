import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FoodDetailComponent } from "./Food/food-detail/food-detail.component";
import { FoodEditComponent } from "./Food/food-edit/food-edit.component";
import { FreezerTabComponent } from "./freezer-tab/freezer-tab.component";
import { ImpendingExpirationTabComponent } from "./impending-expiration-tab/impending-expiration-tab.component";
import { PageNotFoundComponent } from "./shared/page-not-found/page-not-found.component";
import { PantryTabComponent } from "./pantry-tab/pantry-tab.component";
import { SearchBoxComponent } from "./shared/search-box/search-box.component";
import { InfoStartComponent } from "./shared/info-start/info-start.component";
import { ListTabComponent } from "./list-tab/list-tab.component";

const appRoutes = [
    { path: '', redirectTo: '/pantry', pathMatch: 'full' },
    {
        path: 'pantry', component: ListTabComponent, children: [
            { path: '', component: InfoStartComponent },
            { path: 'search', component: SearchBoxComponent },
            { path: 'new', component: FoodEditComponent },
            { path: ':id', component: FoodDetailComponent },
            { path: ':id/edit', component: FoodEditComponent }
        ]
    },
    {
        path: 'freezer', component: ListTabComponent, children: [
            { path: '', component: InfoStartComponent },
            { path: 'search', component: SearchBoxComponent },
            { path: 'new', component: FoodEditComponent },
            { path: ':id', component: FoodDetailComponent },
            { path: ':id/edit', component: FoodEditComponent }
        ]
    },
    { path: 'impendingExpiration', component: ImpendingExpirationTabComponent },
    { path: 'search', component: SearchBoxComponent },
    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }