import { Component, Input } from '@angular/core';

@Component({
  selector: 'cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent  {
  @Input() name: string | undefined;
}
