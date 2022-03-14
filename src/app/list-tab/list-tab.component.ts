import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { informationService } from '../shared/information.service';

@Component({
  selector: 'app-list-tab',
  templateUrl: './list-tab.component.html',
  styleUrls: ['./list-tab.component.css']
})
export class ListTabComponent implements OnInit {
  impendingExpirationMode: boolean;
  filterDate: Date;
  startDate: string;

  constructor(private router: Router, private route: ActivatedRoute, private infoService: informationService) { }

  ngOnInit(): void {
    // this.impendingExpirationMode = this.route.toString().includes('impendingExpiration');

    this.route.paramMap.subscribe( (paramMap: ParamMap) => {
      if(paramMap.has('tab')){

        this.impendingExpirationMode = (paramMap.get('tab') === 'impendingExpiration');
      }
    })

    if (this.infoService.getFilterDate()) {
      this.filterDate = this.infoService.getFilterDate()
    }
    else {
      let today = new Date();
      this.filterDate = new Date(+today.getFullYear().toString(), today.getMonth() + 1, today.getDate());
      // console.log('Food list initial filterDate: ' + this.filterDate);
      this.infoService.setFilterDate(this.filterDate);
    }
    this.startDate = this.filterDate.getFullYear().toString() + '-' + (this.filterDate.getMonth()).toString().padStart(2, '0') + '-' + this.filterDate.getDate().toString().padStart(2, '0');
  }

  onSearch() {
    // console.log(this.route);
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
    // console.log(this.filterDate)
  }


}
