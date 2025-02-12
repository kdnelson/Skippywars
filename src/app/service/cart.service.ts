import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cartItemList : any =[]
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");

  constructor() { }

  getProducts(){
    return this.productList.asObservable();
  }

  getTotalCount(){
    let count = 0;
    this.cartItemList.map((a:any)=>{
      count += a.quantity;
    })
    return count;
  };

  getTotalPrice() : number{
    let subTotal = 0;
    this.cartItemList.map((a:any)=>{
      subTotal += (a.total * a.quantity);
    })
    return subTotal;
  }

  // TODO: Whats this?  Rename it?
  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addtoCart(product : any){
    let productFound = false;
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        a.quantity++;
        productFound = true;
      }
    })

    if(productFound == false) {
      this.cartItemList.push(product);
    }
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
  }

  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }

  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }
}
