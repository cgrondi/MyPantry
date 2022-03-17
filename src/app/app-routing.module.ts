import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FoodDetailComponent } from "./Food/food-detail/food-detail.component";
import { FoodEditComponent } from "./Food/food-edit/food-edit.component";
import { PageNotFoundComponent } from "./shared/page-not-found/page-not-found.component";
import { SearchBoxComponent } from "./shared/search-box/search-box.component";
import { InfoStartComponent } from "./shared/info-start/info-start.component";
import { ListTabComponent } from "./list-tab/list-tab.component";
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "./auth/auth.guard";

const appRoutes = [
    { path: '', redirectTo: 'tabs/pantry', pathMatch: 'full' },
    {
      path: 'tabs/:tab', component: ListTabComponent, children: [
        { path: '', component: InfoStartComponent },
        { path: 'search', component: SearchBoxComponent },
        { path: 'new', component: FoodEditComponent, canActivate: [AuthGuard] },
        { path: ':id', component: FoodDetailComponent },
        { path: ':id/edit', component: FoodEditComponent, canActivate: [AuthGuard] }
      ]
    },
    { path:'auth/:authMode', component: AuthComponent },
    { path: 'search', component: SearchBoxComponent },
    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/not-found' }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule { }
