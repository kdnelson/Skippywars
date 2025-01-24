import { Component, VERSION, OnInit, HostListener, Input } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { CartModalComponent } from '../cart-modal/cart-modal.component';

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

  public totalItem : number = 0;
  public searchTerm !: string;
  // TODO: change this to a Cart object
  public name = 'Angular ' + VERSION.major;
  public mediaSize = "";

  @HostListener('window:resize', ['$event'])

  onResize() {
    this.getMediaSize();
  }

  ngOnInit(): void {
    this.getMediaSize();
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    })
  }

  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }

  updateCartModal(): void {
    // TODO: This is where the cart list gets items pushed 
    // or items are updated
    this.name += Math.floor(Math.random() * 10);
  }

  openCartModal() {
    this.ngxSmartModalService.getModal('cart').open();
  }

  getMediaSize() {
    // TODO: push strings phone, tablet, desktop to a constants file
    if(window.innerWidth < 481) {
      this.mediaSize = "phone"
    } else if (window.innerWidth >= 480) {
      this.mediaSize = "desktop"
    }
  }
}
