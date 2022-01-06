import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pantry-tab',
  templateUrl: './pantry-tab.component.html',
  styleUrls: ['./pantry-tab.component.css']
})
export class PantryTabComponent implements OnInit {
  // itemSelected = false;
  // searchMode = false;
  // constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  // onSearch() {
  //   console.log(this.route);
  //   this.router.navigate(['search'], { relativeTo: this.route });
  // }

  // onAddItem() {
  //   this.router.navigate(['new'], { relativeTo: this.route });
  // }

}
