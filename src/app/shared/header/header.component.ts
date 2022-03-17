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

    this.authListenerSub = this.authService.getAuthStatusListener().subscribe( isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated
    });

    this.userIsAuthenticated = this.authService.getIsAuthenticated();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
      this.authListenerSub.unsubscribe();
      this.routerSub.unsubscribe();
  }
}
