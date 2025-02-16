import { Component, VERSION, OnInit, HostListener, Input } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { CartModalComponent } from '../cart-modal/cart-modal.component';
import { CartItem } from '../../models/cartItem';
import { Cart } from '../../models/cart';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
   providers: [CartModalComponent],
})
export class HeaderComponent implements OnInit {
  public counter : number = 0;
  public cartItems: CartItem[] = [];
  public searchTerm !: string;
  public subTotal = "";
  public tax = "";
  public total = "";
  public mediaSize = "";

  constructor(
    public cartService: CartService,
    public cartModalComponent: CartModalComponent,
    public ngxSmartModalService: NgxSmartModalService
  ) {}

  // TODO: use this somwwhere else, like just under the title SkippyWars
  //public name = 'Angular ' + VERSION.major;

  @HostListener('window:resize', ['$event'])

  ngOnInit(): void {
    this.getMediaSize();
    this.cartService.getProducts()
      .subscribe(res=> {
        this.counter = this.cartService.getTotalCount();
      })
  }

  search(event:any) {
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.cartService.search.next(this.searchTerm);
  }

  openCartModal() {
    if(this.counter == 0) {
      return;
    }

    let cart = this.cartService.getCartModel();
    this.cartItems = this.cartService.getCartItems();
    this.subTotal = cart.subTotal.toFixed(2).toString();
    this.tax = cart.tax.toFixed(2).toString();
    this.total = cart.total.toFixed(2).toString();
    this.ngxSmartModalService.getModal('cart').open();
  }

  getMediaSize() {
    // TODO: push strings phone, tablet, desktop to a constants file
    if(window.innerWidth < 551) {
      this.mediaSize = "phone"
    } else if (window.innerWidth >= 550) {
      this.mediaSize = "desktop"
    }
  }
}
