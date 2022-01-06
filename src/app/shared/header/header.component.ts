import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isPantry = false;
  isFreezer = false;
  isImpendingExpiration = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log("Checking url")
    this.isPantry = this.route.toString().includes('pantry');
    console.log("Route = " + this.route.toString());
    if (this.route.toString().includes('pantry')) {
      console.log("route contains pantry");
      this.isPantry = true;
    }
    else if (this.route.toString().includes('freezer')) {
      console.log("route contains freezer");
      this.isPantry = true;
    }
    else if (this.route.toString().includes('ImpendingExpiration')) {
      console.log("route contains impendingExpiration");
      this.isPantry = true;
    }
    else {
      console.log("ERROR: Route does not contain Pantry, Freezer, or ImpendingExpiration. ERROR in Header Component.")
    }
  }

  callRoute() {
    console.log("Route = " + this.route);
    console.log(this.route)
  }



}
