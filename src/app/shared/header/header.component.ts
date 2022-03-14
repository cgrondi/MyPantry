import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isPantry = false;
  isFreezer = false;
  isImpendingExpiration = false;

  private paramSub: Subscription;

  activeTab = "pantry";

  constructor(private location: Location) { }

  ngOnInit(): void {

      // // //Tried using param map to mange activeTab but activated route is always empty so no params to base it off of  //  //  //
    // this.paramSub = this.route.paramMap.subscribe( (paramMap: ParamMap) => {
    //   console.log("paramMap = ")
    //   console.log(this.route)
    //   if(paramMap.has('tab')){
    //     console.log('has tab')
    //     this.activeTab = paramMap.get('tab');
    //     console.log("active tab = " + this.activeTab)
    //   }
    //   else if(paramMap.has('id')){
    //     console.log('We have id')
    //   }
    //   else{
    //     console.log('does not have tab')
    //   }
    // })


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
