import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Event, NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isPantry = false;
  isFreezer = false;
  isImpendingExpiration = false;
  userIsAuthenticated: boolean = false;

  private authListenerSub: Subscription;
  private routerSub: Subscription;

  activeTab = "pantry";

  constructor(private location: Location, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    //  //  Whenever a route change is detected, checks value of location.path() and sets activeTab appropriately.
    this.routerSub = this.router.events.subscribe( (event: Event) => {
      if (event instanceof NavigationEnd) {
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
          this.activeTab = '';
        }
      }
    });

      //  //  This if/else block just initializes the activeTab property when site first loads up
    // if (this.location.path().includes('pantry')) {
    //   this.activeTab = 'pantry';
    // }
    // else if (this.location.path().includes('freezer')) {
    //   this.activeTab = 'freezer';
    // }
    // else if (this.location.path().includes('impendingExpiration')) {
    //   this.activeTab = 'impendingExpiration';
    // }
    // else {
    //   //  // If it doesn't contain these things then we are probably in an auth page.
    //   // console.log("ERROR: Route does not contain Pantry, Freezer, or ImpendingExpiration. ERROR in Header Component.")
    // }

    this.authListenerSub = this.authService.getAuthStatusListener().subscribe( isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated
    });

    this.userIsAuthenticated = this.authService.getIsAuthenticated();
  }

  //  //  made obsolete by router subscription seen in ngOninit
  // setActiveTab(activeTab: string) {
  //   this.activeTab = activeTab;
  // }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
      this.authListenerSub.unsubscribe();
      this.routerSub.unsubscribe();
  }



}
