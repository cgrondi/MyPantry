import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { informationService } from '../information.service';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent implements OnInit {

  searchForm: FormGroup;
  name = '';
  brand = '';
  expDate = '';
  quantity: number;
  tags = new FormArray([]);
  needsInput: boolean = false;

  constructor(private infoService: informationService) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      'name': new FormControl(),
      'brand': new FormControl(),
      'expDate': new FormControl(),
      'quantity': new FormControl(null, Validators.min(0)),
      'tags': this.tags
    })
  }

  onSearch() {
    this.name = this.searchForm.value.name;
    this.brand = this.searchForm.value.brand;
    this.expDate = this.searchForm.value.expDate;
    this.quantity = this.searchForm.value.quantity;
    this.needsInput = false;
    this.infoService.setSearchFields(this.searchForm.value);
  }

  onAddTag() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.searchForm.get('tags')).push(control);
  }

  getTagControls() {
    return (<FormArray>this.searchForm.get('tags')).controls;
  }
  onDeleteTag(index: number) {
    (<FormArray>this.searchForm.get('tags')).removeAt(index);
  }
  clearForm() {
    this.searchForm.reset()
  }

}
