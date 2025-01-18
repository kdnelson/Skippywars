import { Component, VERSION, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(
    private cartService: CartService,
    public ngxSmartModalService: NgxSmartModalService) {
  }

  public totalItem : number = 0;
  public searchTerm !: string;
  name = 'Angular ' + VERSION.major;

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
}
