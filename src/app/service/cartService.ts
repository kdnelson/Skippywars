import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cartItem';
import { Product } from '../models/product';
import { Guid } from 'guid-typescript';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList : CartItem[] = [];

    constructor(
      public ngxSmartModalService: NgxSmartModalService
    ) {}

  openCartModal() {
    this.ngxSmartModalService.getModal('cart').open();
  }

  closeCartModal() {
    this.ngxSmartModalService.getModal('cart').close();
  }

  cancelCartModal() {
    console.log("cancelCartModal");
    this.getCartItems().map((cartItem: CartItem) => {
      cartItem.isSelected = false;
    });
  }

  getCartItems() {
    return this.cartItemList;
  }

  getTotalCount() {
    let count = 0;
    this.getCartItems().map((cartItem)=>{
      count += cartItem.quantity;
    })
    return count;
  };

  getSubTotal() : number {
    let subTotal = 0;
    this.getCartItems().map((cartItem)=>{
      subTotal += (cartItem.price * cartItem.quantity);
    })
    return subTotal;
  }

  getTax() : number {
    return this.getSubTotal() * 0.10;
  }

  getTotal() : number {
    return this.getSubTotal() + this.getTax();
  }

  addtoCart(product : Product){
    if(this.getTotalCount() >= 99) {
      return;
    }

    let cartItemFound = false;
    this.getCartItems().map((cartItem)=> {
      if(product.id === cartItem.id) {
        cartItem.quantity++;
        cartItemFound = true;
      }
    })

    if(cartItemFound == false) {
      this.cartItemList.push(this.getCartItemModel(product));
    }

    this.getTotalCount();
  }

  removeCartItem(cartItemId: string) {
    this.getCartItems().map((cartItem: CartItem, index: number) => {
      if(cartItemId === cartItem.id) {
        if(cartItem.quantity > 1) {
          cartItem.quantity--;
        } else {
          this.getCartItems().splice(index, 1);
        }
      }
    })

    this.getTotalCount();
  }

  selectedCartItem(cartItemId: string) {
    this.getCartItems().map((cartItem: CartItem) => {
      cartItem.isSelected = false;
      if(cartItemId === cartItem.id) {
        cartItem.isSelected = !cartItem.isSelected;
      }
    });
  }

  removeAllCartItems(){
    this.cartItemList = []
  }

  getCartItemModel(product: Product) : CartItem {
    let cartItem = new CartItem (
      product.id,
      product.title,
      product.price,
      1,
      false
    );
    return cartItem;
  }

  getCartModel() : Cart {
    let cart = new Cart (
      Guid.create().toString(),
      "",
      this.getTotalCount(),
      this.getSubTotal(),
      this.getTax(),
      this.getTotal(),
    );
    return cart;
  }
}
