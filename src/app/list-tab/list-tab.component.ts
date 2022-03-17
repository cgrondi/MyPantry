import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { informationService } from '../shared/information.service';

@Component({
  selector: 'app-list-tab',
  templateUrl: './list-tab.component.html',
  styleUrls: ['./list-tab.component.css']
})
export class ListTabComponent implements OnInit, OnDestroy {
  impendingExpirationMode: boolean;
  filterDate: Date;
  startDate: string;
  userIsAuthenticated: boolean = false;

  private authListenerSub: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private infoService: informationService, private authService: AuthService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( (paramMap: ParamMap) => {
      if(paramMap.has('tab')){
        this.impendingExpirationMode = (paramMap.get('tab') === 'impendingExpiration');
      }
    });

    this.authListenerSub = this.authService.getAuthStatusListener().subscribe( isAuthenticated => {
      console.log("list-tab isAuthenticated = " + isAuthenticated);
      this.userIsAuthenticated = isAuthenticated;
    });

    this.userIsAuthenticated = this.authService.getIsAuthenticated();

    if (this.infoService.getFilterDate()) {
      this.filterDate = this.infoService.getFilterDate()
    }
    else {
      let today = new Date();
      this.filterDate = new Date(+today.getFullYear().toString(), today.getMonth() + 1, today.getDate());
      this.infoService.setFilterDate(this.filterDate);
    }
    this.startDate = this.filterDate.getFullYear().toString() + '-' + (this.filterDate.getMonth()).toString().padStart(2, '0') + '-' + this.filterDate.getDate().toString().padStart(2, '0');
  }

  onSearch() {
    this.router.navigate(['search'], { relativeTo: this.route });
  }

  onAddItem() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }



  setDate(form: NgForm) {
    let date = form.value.dateInput;
    let dateArray = date.split('-');
    this.filterDate = new Date(+dateArray[0], +dateArray[1] - 1, +dateArray[2]);
    this.infoService.setFilterDate(this.filterDate);
  }

  ngOnDestroy(): void {
      this.authListenerSub.unsubscribe();
  }


}
