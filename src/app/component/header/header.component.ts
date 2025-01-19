import { Component, VERSION, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { CartModalComponent } from '../cart-modal/cart-modal.component';
import { NgxSmartModalService } from 'ngx-smart-modal';
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

  public totalItem : number = 0;
  public searchTerm !: string;

  ngOnInit(): void {
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

  openCartModal() {
    this.cartModalComponent.loadModal();
  }

  loadCartModal() : Cart {
    let cart = new Cart();
    cart.name = 'Angular ' + VERSION.major
    return cart;
  }
}
