import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart } from '../models/cart';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList : CartItem[] = [];
  // TODO remove?
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor() { }

  // TODO move this!
  getProducts(){
    return this.productList.asObservable();
  }

  // TODO: Whats this?  Rename it?  Move it?
  // setProduct(product : any){
  //   this.cartItemList.push(...product);
  //   this.productList.next(product);
  // }

  getCartItems() {
    return this.cartItemList;
  }

  getTotalCount() {
    let count = 0;
    this.cartItemList.map((cartItem)=>{
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

  addtoCart(product : any){
    let productFound = false;
    this.cartItemList.map((cartItem)=>{
      if(product.id === cartItem.id){
        cartItem.quantity++;
        productFound = true;
      }
    })

    if(productFound == false) {
      this.cartItemList.push(product);
    }
    this.productList.next(this.cartItemList);
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

  removeAllCart(){
    this.cartItemList = []
    // TODO Whats this next stuff?
    this.productList.next(this.cartItemList);
  }

  getCartModel() : any {
    let cart = new Cart
    cart.subTotal = this.getSubTotal();
    cart.tax = this.getTax();
    cart.total = this.getTotal();
    return cart;
  }

  getFormattedPrive(price: number) {
    return 
  }
}
