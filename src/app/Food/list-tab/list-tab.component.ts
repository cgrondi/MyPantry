import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { informationService } from '../../shared/information.service';

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
  private sortByListener = new Subject<{name: string, value: number}>();
  upOrDown: number = -1;
  sortOn: string;

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
      this.filterDate = new Date(+today.getFullYear().toString(), today.getMonth(), today.getDate());
      this.infoService.setFilterDate(this.filterDate);
    }
    this.startDate = this.filterDate.getFullYear().toString() + '-' + (this.filterDate.getMonth()+1).toString().padStart(2, '0') + '-' + this.filterDate.getDate().toString().padStart(2, '0');
  }

  getSortByListener(){
    return this.sortByListener.asObservable();
  }

  onSearch() {
    this.router.navigate(['search'], { relativeTo: this.route });
    let el = document.getElementById('scrollTo');
    el.scrollIntoView({behavior: 'smooth'});
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

  sortBy(name: string){
    this.sortOn = name;
    this.upOrDown *= -1;
    this.sortByListener.next({name: name, value: this.upOrDown});
  }


}
