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
  constructor(
    public cartService: CartService,
    public cartModalComponent: CartModalComponent,
    public ngxSmartModalService: NgxSmartModalService
  ) {}

  public counter : number = 0;
  public searchTerm !: string;
  public mediaSize = "";

  // TODO: use this somwwhere else, like just under the title SkippyWars
  //public name = 'Angular ' + VERSION.major;

  //public cartItems: CartItem[] = [];
  public cartItems : any = [];
  public subTotal = "";
  public tax = "";
  public total = "";

  @HostListener('window:resize', ['$event'])

  onResize() {
    this.getMediaSize();
  }

  ngOnInit(): void {
    this.getMediaSize();
    this.cartService.getProducts()
    .subscribe(res=>{
      this.cartItems = res;
      this.counter = this.cartService.getTotalCount();
    })
  }

  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.cartService.search.next(this.searchTerm);
  }

  updateCartModal(): void {
    // TODO: This is where the cart list gets items pushed 
    // or items are updated
    //this.name += Math.floor(Math.random() * 10);
  }

  openCartModal() {
    // TODO: get Cart from CartService and assign to local variables
    let cart = new Cart
    cart.counter = 789
    cart.subTotal = 100
    cart.tax = 12
    cart.total = 220

    this.subTotal = cart.subTotal.toString();
    this.tax = cart.tax.toString();
    this.total = cart.total.toString();

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
