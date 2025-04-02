import { Component, VERSION, OnInit, HostListener } from '@angular/core';
import { CartService } from '../../service/cartService';
import { ProductService } from '../../service/productService';
import { CartModalComponent } from '../cart-modal/cart-modal.component';
import { CartItemModalComponent } from '../cart-item-modal/cart-item-modal.component';
import { CartItem } from '../../models/cartItem';
import { OptionItem } from '../../models/optionItem';
import { Cart } from '../../models/cart';
import {
  MAX_MEDIA_SIZE_DESKTOP,
  MAX_MEDIA_SIZE_PHONE
} from '../../../constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [CartModalComponent, CartItemModalComponent],
})
export class HeaderComponent implements OnInit {
  public nGVersion = 'Angular ' + VERSION.major;
  public counter : number = 0;
  public cartItems: CartItem[] = [];
  public searchTerm !: string;
  public subTotal: string = "";
  public tax: string = "";
  public total: string = "";
  public mediaSize = "";
  public title = "Some Skippy Title";
  public optionSubTotal = "123.45";
  //public optionItems: OptionItem[] = [];
  public optionItems: OptionItem[] = [
    {"id": "1", "name": "Cup holder", "cost": "12.34", "isSelected": false}, 
    {"id": "2", "name": "Arm rest", "cost": "7.34", "isSelected": true}, 
    {"id": "3", "name": "Feet warmer", "cost": "9.34", "isSelected": false}, 
  ];

  constructor(
    public cartService: CartService,
    public productService: ProductService,
    public cartModalComponent: CartModalComponent,
    public cartItemModalComponent: CartItemModalComponent,
  ) {}

  @HostListener('window:resize', ['$event'])

  ngOnInit(): void {
    this.getMediaSize();
  }

  search(event:any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.productService.search.next(this.searchTerm);
  }

  openCartModal() {
    this.counter = this.cartService.getTotalCount();
    if(this.counter == 0) {
      return;
    }

    let cart: Cart = this.cartService.getCartModel();
    if(cart !== undefined) {
      this.cartItems = this.cartService.getCartItems();
      this.subTotal = cart.subTotal.toFixed(2).toString();
      this.tax = cart.tax.toFixed(2).toString();
      this.total = cart.total.toFixed(2).toString();
      this.cartService.cancelCartModal();
      this.cartService.openCartModal();
    }
  }

  getMediaSize() {
    if(window.innerWidth >= MAX_MEDIA_SIZE_DESKTOP) {
      this.mediaSize = "desktop"
    } else if (window.innerWidth < MAX_MEDIA_SIZE_DESKTOP &&
      window.innerWidth > MAX_MEDIA_SIZE_PHONE) {
      this.mediaSize = "tablet"
    } else if (window.innerWidth <= MAX_MEDIA_SIZE_PHONE) {
      this.mediaSize = "phone"
    }
  }
}
