import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AngularMaterialModule } from "../angular-material.module";
import { InfoStartComponent } from "./info-start/info-start.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { SearchBoxComponent } from "./search-box/search-box.component";

@NgModule({
  declarations: [
    SearchBoxComponent,
    InfoStartComponent,
    PageNotFoundComponent
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class SharedModule {}
