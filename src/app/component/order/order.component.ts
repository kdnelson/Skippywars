import { Component, OnInit } from '@angular/core';
// import { OrderService } from '../../service/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public orders : any = [];
  //constructor(private orderService : OrderService) { }

  ngOnInit(): void {
    // this.cartService.getProducts()
    // .subscribe(res=>{
    //   this.products = res; 
    //   this.grandTotal = this.cartService.getTotalPrice();
    // })
  }
  removeItem(){
    //this.cartService.removeCartItem(item);
  }
  emptycart(){
    //this.cartService.removeAllCart();
  }
}
