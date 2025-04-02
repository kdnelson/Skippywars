import { Component, Input } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { OptionItem } from '../../models/optionItem';

@Component({
  selector: 'cart-item-modal',
  templateUrl: './cart-item-model.component.html',
  styleUrls: ['./cart-item-modal.component.scss'],
})
export class CartItemModalComponent  {
  @Input() mediaSize: string | undefined;
  @Input() title: string | undefined;
  @Input() subTotal: string | undefined;
  @Input() optionItems: OptionItem[] | undefined;
 
  constructor(
    public ngxSmartModalService: NgxSmartModalService
  ) {
  }
}
