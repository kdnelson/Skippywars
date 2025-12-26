import { Injectable } from "@angular/core";
import { ObservableStore } from "@codewithdan/observable-store";
import { of } from "rxjs";
import { CategoryFilter } from "../models/categoryFilter";
import { ErrorMsg } from "../models/errorMsg";
import { ErrorType } from "../models/errorType";
import { Filter } from "../models/filter";
import { FilterOption } from "../models/filterOption";
import { StoreActions } from "../models/storeActions";
import { StoreState } from "../models/storeState";
import { LogService } from "./log.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryFilterService extends ObservableStore<StoreState> {
  className: string = "CategoryFilterService";
  categoryFilter: CategoryFilter;

  constructor(
    public errorType: ErrorType,
    public logService: LogService
    ) {
      super({ 
          trackStateHistory: true, 
          logStateChanges: true 
      });
      this.init();
  }
 
  init() {
    let methodName: string = 'init';
 
    try {    
      let filters = this.fetchFilters();
      filters.forEach((filter) => {
        this.add(filter);
      });
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }
 
  get() {
    let methodName: string = 'get';
 
    try {    
      const filters = this.getState().filters;
      return of(filters);
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }
  
  add(filter: Filter) {
    let methodName: string = 'add';
 
    try {              
      let state = this.getState();
      state.filters.push(filter);
      this.setState({ filters: state.filters }, StoreActions.AddFilter);       
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    } finally {
      console.log('State History:', this.stateHistory);
    }
  }
 
  remove() {
    let methodName: string = 'remove';
 
    try {    
      let state = this.getState();
      state.filters.splice(state.filters.length - 1, 1);
      this.setState({ filters: state.filters }, StoreActions.RemoveFilter);
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    } finally {
      console.log('State History:', this.stateHistory);
    }
  }

  toggleSelected(searchFilter: Filter) {
    let methodName: string = 'toggleSelected';
 
    try {              
      let state = this.getState();
      state.filters.forEach((filter) => {
        if(filter.id === searchFilter.id) {
          if(filter.isSelected){
            filter.isSelected = false;
          }else {
            filter.isSelected = true;
          }
        }
      });
      this.setState({ filters: state.filters }, StoreActions.ToggleSelectedFilter);       
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    } finally {
      console.log('State History:', this.stateHistory);
    }
  }

  fetchFilters(): Filter[] {
    let methodName: string = 'fetchFilters';
 
    try {  
      let filters: Filter[] = [
        new Filter('0', '1 to 999 credits', false, new FilterOption('MINCOST', '')),
        new Filter('1', '1,000 to 999,999 credits', false, new FilterOption('AVGCOST', '')),
        new Filter('2', '1,000,000+ credits', false, new FilterOption('MAXCOST', '')),
        new Filter('3', '1 to 49 crew', false, new FilterOption('', 'MINCREW')),
        new Filter('4', '50 to 999 crew', false, new FilterOption('', 'AVGCREW')),
        new Filter('5', '1,000+ crew', false, new FilterOption('', 'MAXCREW'))
      ];
      return filters;
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    } finally {
      console.log('State History:', this.stateHistory);
    }
  }
}