import { Component, Input, VERSION } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Cart } from '../../models/cart';

@Component({
  selector: 'cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent {
  constructor(
    public ngxSmartModalService: NgxSmartModalService
  ) {}

  @Input() cartData: Cart = {};

  ngOnInit() {
    this.cartData = this.loadCartModal();
  }

  loadModal() {
    console.log(this.cartData);
    this.ngxSmartModalService.getModal('cart').open();
  }

  // TODO: Load from service
  loadCartModal() : Cart {
    let cart = new Cart();
    cart.name = 'Angular ' + VERSION.major
    return cart;
  }
}
