import { Injectable } from "@angular/core";
import { ObservableStore } from "@codewithdan/observable-store";
import { Guid } from "guid-typescript";
import { of } from "rxjs";
import { ErrorMsg } from "../models/errorMsg";
import { ErrorType } from "../models/errorType";
import { FilterOption } from "../models/filterOption";
import { MenuItem } from "../models/menuItem";
import { StoreActions } from "../models/storeActions";
import { StoreState } from "../models/storeState";
import { LogService } from "./log.service";
import { CartItem } from "../models/cartItem";

@Injectable({
  providedIn: 'root'
})
export class MenuItemService extends ObservableStore<StoreState> {
  className: string = "MenuItemService";
  private initialState: Partial<StoreState> = {
    cartItem: {},
    cartItems: [],
    filter: {},
    filters: [],
    menuItem: {},
    menuItems: []
  }
  private vehiclesUrl = 'https://swapi.dev/api/vehicles/';
  private starShipsUrl = 'https://swapi.dev/api/starships/';

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
      this.setState(this.initialState, StoreActions.InitializeState);
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }
 
  get() {
    let methodName: string = 'get';
    let menuItems;
 
    try {
      menuItems = this.getState().menuItems;
      if(menuItems !== undefined) {
        if (menuItems.length > 0) {
          console.log('Returning menuItems from store...');
        }
      }
      else {
        console.log('Calling menuItems from SWAPI...');
        this.fetchMenuItems();
        const menuItems = this.getState().menuItems;
      }
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }

    return of(menuItems);
  }
  
  add(menuItem: MenuItem) {
    let methodName: string = 'add';
 
    try {              
      let state = this.getState();
      menuItem = this.setCostFilters(menuItem);
      menuItem = this.setCrewFilters(menuItem);
      state.menuItems?.push(menuItem);
      this.setState({ menuItems: state.menuItems }, StoreActions.AddMenuItem);       
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
      state.menuItems?.splice(state.menuItems.length - 1, 1);
      this.setState({ menuItems: state.menuItems }, StoreActions.RemoveMenuItem);
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    } finally {
      console.log('State History:', this.stateHistory);
    }
  }
 
  setCostFilters(menuItem: MenuItem) : MenuItem {
    let methodName: string = 'setCostFilters';
 
    try {
      if(Number(menuItem.cost) > 1 && Number(menuItem.cost) < 999) {
        menuItem.costRange = 'MINCOST';
      }
      else if(Number(menuItem.cost) > 1000 && Number(menuItem.cost) < 9999) {
        menuItem.costRange = 'AVGCOST';
      }
      else if(Number(menuItem.cost) > 10000) {
        menuItem.costRange = 'MAXCOST';
      }
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }

    return menuItem;  
  }

  setCrewFilters(menuItem: MenuItem) : MenuItem {
    let methodName: string = 'setCrewFilters';
 
    try {
      if(Number(menuItem.crew) > 1 && Number(menuItem.crew) < 49) {
        menuItem.crewRange = 'MINCREW';
      }
      else if(Number(menuItem.crew) > 50 && Number(menuItem.crew) < 999) {
        menuItem.crewRange = 'AVGCREW';
      }
      else if(Number(menuItem.crew) > 1000) {
        menuItem.crewRange = 'MAXCREW';
      }   
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }

    return menuItem; 
  }

  fetchMenuItems() {
    let methodName: string = 'fetchMenuItems';
 
    try {    
      this.getPagedVehicles(this.vehiclesUrl);
      this.getPagedStarShips(this.starShipsUrl);
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    } finally {
      console.log('State History:', this.stateHistory);
    }
  }
 
  getPagedVehicles = (url: string | URL | Request) : Promise<MenuItem[]> => {
    let methodName: string = 'getPagedVehicles';
    let response = null;
    let errorMsg = null;

    return new Promise(async (resolve) => {   
      response = await fetch(url);
      if(response !== null){
        let data = await response.json();
        data.results.forEach((element: any) => {
          let newMenuItem = this.createMenuItem(element);
          this.add(newMenuItem);
        });

        if (data.next !== null) {
          return setTimeout(() => resolve(this.getPagedVehicles(data.next)), 0);
        } else {
          return resolve(this.initialState.menuItems);
        }
      } else {
        errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullResponse);
        this.logService.logHandler(errorMsg);
      }
    })
  }
  
  getPagedStarShips = (url: string | URL | Request): Promise<MenuItem[]> => {
    let methodName: string = 'getPagedStarShips';
    let response = null;

    return new Promise(async (resolve) => {     
      response = await fetch(url)
      if(response !== null){
        let data = await response.json();
        data.results.forEach((element: any) => {
          let newMenuItem = this.createMenuItem(element);
          this.add(newMenuItem);
        });

        if (data.next !== null) {
          return setTimeout(() => resolve(this.getPagedStarShips(data.next)), 0);
        } else {
          return resolve(this.initialState.menuItems);
        }
      } else {
        let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullResponse);
        this.logService.logHandler(errorMsg);
      }
    })
  }
  
  createMenuItem(rawMenuItem: any) : MenuItem {
    let methodName: string = 'createMenuItem';
    var result: MenuItem = {};
  
    try {   
      result = new MenuItem(
        Guid.create().toString(),
        rawMenuItem.name, 
        rawMenuItem.manufacturer, 
        rawMenuItem.cost_in_credits, 
        rawMenuItem.length, 
        rawMenuItem.max_atmosphering_speed, 
        rawMenuItem.crew, 
        rawMenuItem.passengers, 
        rawMenuItem.cargo_capacity, 
        rawMenuItem.consumables
      );
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  
    return result;
  }
}