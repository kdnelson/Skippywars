import { Component, Input } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'cart-item-modal',
  templateUrl: './cart-item-model.component.html',
  styleUrls: ['./cart-item-modal.component.scss'],
})
export class CartItemModalComponent  {
  @Input() mediaSize: string | undefined;

  constructor(
    public ngxSmartModalService: NgxSmartModalService
  ) {
  }
}
