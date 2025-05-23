import { Component, Input } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { CartService } from '../../service/cartService';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent  {
  @Input() mediaSize: string | undefined;
  @Input() isShowCart: boolean | undefined;
  @Input() counter: string | undefined;
  @Input() cartItems: CartItem[] | undefined;
  @Input() isSelected: boolean | undefined;
  @Input() subTotal: string | undefined;
  @Input() tax: string | undefined;
  @Input() total: string | undefined;

  constructor(
    public cartService: CartService,
    public ngxSmartModalService: NgxSmartModalService
  ) {
    this.isShowCart = true;
  }

  removeCartItem(cartItemId: string) {
    this.cartService.removeCartItem(cartItemId);
    this.updateCartModal();
  }

  cancelCartItem(cartItemId: string) {
    this.cartItems?.map((item) => { 
      if(item.id === cartItemId)
      {
        item.isSelected = false;
      }
    });
    this.isShowCart = false;
    setTimeout(() => this.isShowCart = true);
  }

  editCartItem(cartItemId: string) {
    console.log(cartItemId, "cartItem to edit");
    this.cartService.openEditCartModal();
  }

  selectedCartItem(cartItemId: string) {
    this.cartService.selectedCartItem(cartItemId);
  }

  updateCartModal() {
    this.counter = this.cartService.getTotalCount().toString();
    this.cartItems = this.cartService.getCartItems();
    this.subTotal = this.cartService.getSubTotal().toFixed(2).toString();
    this.tax = this.cartService.getTax().toFixed(2).toString();
    this.total = this.cartService.getTotal().toFixed(2).toString();

    if(this.cartService.getCartItems().length == 0) {
      this.ngxSmartModalService.getModal('cart').close();
    }
  }
}
