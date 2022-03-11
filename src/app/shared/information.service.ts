import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { searchFields } from "./search-box/search-fields.model";

@Injectable({ providedIn: 'root' })
export class informationService {
    private filterDate: Date;
    private searchFields: searchFields;

    searchFieldsChanged = new Subject<searchFields>();

    getFilterDate() {
        return this.filterDate;
    }

    setFilterDate(newDate: Date) {
        this.filterDate = newDate;
        // console.log('Info Service filterDate set to: ' + this.filterDate);
    }

    setSearchFields(input: searchFields) {
        this.searchFields = input;
        // console.log('new search fields = ')
        // console.log(input);
        this.searchFieldsChanged.next(this.searchFields);
    }

    getSearchFields() {
        let copy = this.searchFields;
        return copy;
    }
}