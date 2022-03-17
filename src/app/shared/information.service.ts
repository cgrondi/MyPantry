import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { searchFields } from "./search-box/search-fields.model";

@Injectable({ providedIn: 'root' })
export class informationService {
    private filterDate: Date;
    private searchFields: searchFields;
    private activeTab: string;

    searchFieldsChanged = new Subject<searchFields>();

    getFilterDate() {
        return this.filterDate;
    }

    setFilterDate(newDate: Date) {
        this.filterDate = newDate;
    }

    getSearchFields() {
        let copy = this.searchFields;
        return copy;
    }

    setSearchFields(input: searchFields) {
        this.searchFields = input;
        this.searchFieldsChanged.next(this.searchFields);
    }

    getActiveTab() {
      return this.activeTab;
    }

    setActiveTab(newTab: string){
      this.activeTab = newTab;
    }
}
