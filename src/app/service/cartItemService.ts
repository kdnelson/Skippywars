import { Injectable } from "@angular/core";
import { ObservableStore } from "@codewithdan/observable-store";
import { of } from "rxjs";
import { CartItem } from "../models/cartItem";
import { ErrorMsg } from "../models/errorMsg";
import { ErrorType } from "../models/errorType";
import { StoreActions } from "../models/storeActions";
import { StoreState } from "../models/storeState";
import { LogService } from "./log.service";

@Injectable({
  providedIn: 'root'
})
export class CartItemService extends ObservableStore<StoreState> {
  className: string = "CartItemService";

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
     
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }
 
  get() {
    let methodName: string = 'get';
 
    try {    
      const cartItems = this.getState().cartItems;
      return of(cartItems);
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }
  
  add(cartItem: CartItem) {
    let methodName: string = 'add';
    let itemIndex = -1;
 
    try {
      let state = this.getState();
      itemIndex = state.cartItems.findIndex(cItem => cItem.id == cartItem.id);
      cartItem.menuItemOptionsCount = this.getMenuItemOptionsCount(cartItem);
      if(itemIndex == -1) {  //  Add new cartItem
        cartItem = this.modCartItemName(cartItem);
        state.cartItems.push(cartItem);
        this.setState({ cartItems: state.cartItems }, StoreActions.AddCartItem);
      } else {  //  Update cartItem
        state.cartItems[itemIndex] = cartItem;
        this.setState({ cartItems: state.cartItems }, StoreActions.UpdateCartItem);
      }
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    } finally {
      console.log('State History:', this.stateHistory);
    }
  }

  remove(cartItemIndex: number) {
    let methodName: string = 'remove';

    try {              
      let state = this.getState();
      state.cartItems.splice(cartItemIndex, 1);
      this.setState({ cartItems: state.cartItems }, StoreActions.RemoveCartItem);
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    } finally {
      console.log('State History:', this.stateHistory);
    }
  }
 
  decrementCartItemCount(cartItem: CartItem) {
    let methodName: string = 'decrementCartItemCount';
    let cartItemIndex = 0;
 
    try {
      let state = this.getState();
      state.cartItems.forEach((cItem) => {
        if(cartItem.id === cItem.id){
          if(cItem.quantity == 1){
            this.remove(cartItemIndex);
          } else {
            cItem.quantity = cItem.quantity - 1;
            this.setState({ cartItems: state.cartItems }, StoreActions.UpdateCartItem); 
          }
        }
        cartItemIndex++;
      })
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    } finally {
      console.log('State History:', this.stateHistory);
    }
  }

  getCartCount() : number {
    let methodName: string = 'getCartCount';
    let cartCounter = 0;

    try {    
        let state = this.getState();
        state.cartItems.forEach((cartItem) => {
            cartCounter = cartCounter + cartItem.quantity;
        })
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }

    return cartCounter;
  }

  getCartSubtotal() : number {
    let methodName: string = 'getCartSubtotal';
    let cartSubtotal: number = 0;

    try {    
        let state = this.getState();
        state.cartItems.forEach((cartItem) => {
            cartSubtotal += parseInt(cartItem.totalPrice.toString());
        })
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }

    return cartSubtotal;
  }

  getCartTax(cartSubTotal: number) : number {
    let methodName: string = 'getCartTax';
    let cartTax: number = 0;

    try {
      if(cartSubTotal > 0){
        let cartTaxPercent = cartSubTotal / 10;
        cartTax = cartTaxPercent
      }    
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }

    return cartTax;
  }

  private modCartItemName(cartItem: CartItem) : CartItem {
    let methodName: string = 'modCartItemName';

    try {    
      if (cartItem.name.length > 23) {
        cartItem.name = cartItem.name.substring(0, 22) + "...";
      }
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }

    return cartItem;
  }

  private getMenuItemOptionsCount(cartItem: CartItem) : number {
    let methodName: string = 'getMenuItemOptionsCount';
    let menuItemOptionsCount: number = 0;

    try {
      cartItem.menuItemOptions.forEach(miOption => {
        if(miOption.isSelected){
          menuItemOptionsCount++;
        }
      });
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }

    return menuItemOptionsCount;
  }
}