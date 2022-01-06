import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-tab',
  templateUrl: './list-tab.component.html',
  styleUrls: ['./list-tab.component.css']
})
export class ListTabComponent implements OnInit {
  itemSelected = false;
  searchMode = false;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSearch() {
    console.log(this.route);
    this.router.navigate(['search'], { relativeTo: this.route });
  }

  onAddItem() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
