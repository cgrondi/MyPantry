import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
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

  activeTab = "";

  constructor(private location: Location) { }

  ngOnInit(): void {

    if (this.location.path().includes('pantry')) {
      this.activeTab = 'pantry';
    }
    else if (this.location.path().includes('freezer')) {
      this.activeTab = 'freezer';
    }
    else if (this.location.path().includes('impendingExpiration')) {
      this.activeTab = 'impendingExpiration';
    }
    else {
      console.log("ERROR: Route does not contain Pantry, Freezer, or ImpendingExpiration. ERROR in Header Component.")
    }
  }


  setActiveTab(activeTab: string) {
    this.activeTab = activeTab;
  }



}
