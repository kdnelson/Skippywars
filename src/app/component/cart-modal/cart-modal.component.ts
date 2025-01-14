import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Cart } from '../../models/cart';
import { Guid } from 'guid-typescript';
import { CartItem } from '../../models/cartItem';
import { MenuItemModalComponent } from '../menuItem-modal/menuItem-modal.component';
import { ErrorType } from '../../models/errorType';
import { LogService } from '../../service/log.service';
import { ErrorMsg } from '../../models/errorMsg';
import { CartItemService } from '../../service/cartItemService';
import { Observable, Subscription } from 'rxjs';
import { MenuItemDetail } from '../../models/menuItemDetail';

@Component({
  selector: 'cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.css'],
  providers: [CartItemService, ErrorType, LogService]
})
export class CartModalComponent {
  className: string = "CartModalComponent";
  subs = new Subscription();
  cartItems$: CartItem[] | Observable<CartItem[]>;

  constructor(
    private cartItemService: CartItemService,
    public ngxSmartModalService: NgxSmartModalService,
    public menuItemModalComponent: MenuItemModalComponent,
    public errorType: ErrorType,
    public logService: LogService
  ) { }

  resetForm(): void {
    let methodName: string = 'resetForm';

    try {
    } catch(errMsg){
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  loadModal() {
    let methodName: string = 'loadModal';
    this.closeAllModals();

    try {    
      let cartItems: CartItem[];
      this.cartItemService.get().subscribe(ci => cartItems = ci);
      let cart: Cart = this.createCart(cartItems);
      if(cart != null){
        this.ngxSmartModalService.setModalData(cart, 'cart', true);
        this.ngxSmartModalService.getModal('cart').open();
      }
    } catch(errMsg){
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }
  
  refreshModal(selectedCartId: String, cart: Cart) {
    let methodName: string = 'refreshModal';

    try {    
      let cartItems: CartItem[];
      this.cartItemService.get().subscribe(ci => cartItems = ci);

      cartItems.forEach(cartItem => {
        if(cartItem.id == selectedCartId){
          cartItem.isSelected = true;
        }
      });

      let updateCart: Cart = this.updateCart(cartItems, cart);
      if(updateCart != null && updateCart.cartItems.length > 0){
        this.ngxSmartModalService.setModalData(updateCart, 'cart', true);
      } else {
        this.closeAllModals();
      }
    } catch(errMsg){
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  submitCart(cart: Cart) {
    let methodName: string = 'submitCart';

    try {
      this.closeAllModals();
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  private closeAllModals() : void {
    let methodName: string = 'closeAllModals';

    try {
      this.ngxSmartModalService.getModal('categoryFilter').close();
      this.ngxSmartModalService.getModal('menuItemDetail').close();
      this.ngxSmartModalService.getModal('cart').close(); 
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  private createCart(cartItems: CartItem[]) : Cart {
    let methodName: string = 'createCart';
  
    let cart: Cart = null;
    
    try {
      if(cartItems !== null) {
        cart = new Cart();
        cart.id = Guid.create().toString();
        cart.itemsCounter = this.cartItemService.getCartCount();
        cart.name = 'Cart_' + cart.id.toString().split('-')[0];
        cart.createdDate = new Date();
        cart.cartItems = cartItems;
        cart.subTotal = this.cartItemService.getCartSubtotal();
        cart.tax = this.cartItemService.getCartTax(cart.subTotal);
        cart.total = cart.subTotal + cart.tax;
        return cart;
      } else {
        let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullMethodParam, 'cartItems');
        this.logService.logHandler(errorMsg);
      }
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  private updateCart(cartItems: CartItem[], cart: Cart) : Cart {
    let methodName: string = 'updateCart';
    
    try {
      if(cart !== null) {
        cart.itemsCounter = this.cartItemService.getCartCount();
        cart.name = cart.name;
        cart.createdDate = cart.createdDate;
        cart.cartItems = cartItems;
        cart.subTotal = this.cartItemService.getCartSubtotal();
        cart.tax = this.cartItemService.getCartTax(cart.subTotal);
        cart.total = cart.subTotal + cart.tax;
        return cart;
      } else {
        let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullMethodParam, 'cartItems');
        this.logService.logHandler(errorMsg);
      }
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  selectedCartItem(cartItem: CartItem, cart: Cart) {
    let methodName: string = 'selectedCartItem';

    try {
      if(CartItem !== null && cart !== null) {
        if(cart.cartItems !== null) {
          cart.cartItems.forEach((item, index) => {
            if(item.id === cartItem.id){
              item.isSelected = true;
            } else {
              item.isSelected = false;
            }
          });
        } else {
          let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, this.errorType.nullMethodParam);
          this.logService.logHandler(errorMsg);
        }
      } else {
        let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, this.errorType.nullMethodParam);
        this.logService.logHandler(errorMsg);
      }
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  cancelCartItem(cartItem: CartItem, cart: Cart) {
    let methodName: string = 'cancelCartItem';
    
    try {
      if(cartItem !== null && cart !== null) {
        if(cart.cartItems !== null) {
          cart.cartItems.forEach((item) => {
            if(item.id === cartItem.id){
              item.isSelected = false;
            }
          });
        } else {
          let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, this.errorType.nullMethodParam);
          this.logService.logHandler(errorMsg);
        }
      } else {
        let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, this.errorType.nullMethodParam);
        this.logService.logHandler(errorMsg);
      }
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  removeCartItem(cartItem: CartItem, cart: Cart) {
    let methodName: string = 'removeCartItem';
    
    try {
      if(cartItem !== null && cart !== null) {
        if(cart.cartItems !== null) {
          cart.cartItems.forEach((cItem) => {
            if(cartItem.id === cItem.id){
              cItem.isSelected = false;
              this.cartItemService.decrementCartItemCount(cItem);
              this.refreshModal(cItem.id, cart);
            }
          });
        } else {
          let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, this.errorType.nullMethodParam);
          this.logService.logHandler(errorMsg);
        }
      } else {
        let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, this.errorType.nullMethodParam);
        this.logService.logHandler(errorMsg);
      }
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  editCartItem(cartItem: CartItem) {
    let methodName: string = 'editCartItem';

    try {
      this.closeAllModals();
      let editMenuItemDetail = this.createMenuItemDetailfromCartItem(cartItem);
      if(editMenuItemDetail !== null) {
        this.menuItemModalComponent.editMenuItemDetail(editMenuItemDetail);
      }
      else {
        let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, errMsg);
        this.logService.logHandler(errorMsg);
      }
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  private createMenuItemDetailfromCartItem(cartItem: CartItem) {
    let methodName: string = 'editCartItem';
    let editMenuItemDetail = null;

    try {
      editMenuItemDetail = new MenuItemDetail();
      editMenuItemDetail.id = cartItem.id;
      editMenuItemDetail.name = cartItem.name;
      editMenuItemDetail.menuItemOptions = cartItem.menuItemOptions;
      editMenuItemDetail.cost = cartItem.price;
      editMenuItemDetail.totalCost = cartItem.totalPrice;
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
    return editMenuItemDetail;
  }
}