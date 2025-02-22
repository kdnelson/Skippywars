import { Injectable } from '@angular/core';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cartItem';
import { Product } from '../models/product';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList : CartItem[] = [];

  constructor() { }

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
    this.cartItemList.map((cartItem)=>{
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
    let productFound = false;
    this.cartItemList.map((cartItem)=> {
      if(product.id === cartItem.id) {
        cartItem.quantity++;
        productFound = true;
      }
    })

    if(productFound == false) {
      this.cartItemList.push(this.getCartItemModel(product));
    }

    this.getTotalCount();
  }

  removeCartItem(product: any){
    this.cartItemList.map((cartItem: CartItem, index: any)=>{
      if(product.id === cartItem.id){
        this.cartItemList.splice(index, 1);
      }
    })

    // TODO Whats this next stuff?
    //this.productList.next(this.cartItemList);
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
      this.getTotalCount(),
      this.getSubTotal(),
      this.getTax(),
      this.getTotal()
    );
    return cart;
  }
}
