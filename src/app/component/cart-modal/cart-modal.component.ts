import { Component, Input } from '@angular/core';
import { CartItem } from '../../models/cartItem';
import { Cart } from '../../models/cart';

@Component({
  selector: 'cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent  {
  @Input() mediaSize: string | undefined;
  @Input() counter: string | undefined;
  @Input() cartItems: CartItem[] | undefined;
  @Input() subTotal: string | undefined;
  @Input() tax: string | undefined;
  @Input() total: string | undefined;
}
