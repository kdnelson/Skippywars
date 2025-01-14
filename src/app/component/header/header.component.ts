import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit, OnInit {
  constructor(
    private cartService : CartService,
    public ngxSmartModalService: NgxSmartModalService) {
  }

  public totalItem : number = 0;
  public searchTerm !: string;

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    })
  }

  ngAfterViewInit() {
    const pen: Object = {
      prop1: 'test',
      prop2: true,
      prop3: [{ a: 'a', b: 'b' }, { c: 'c', d: 'd' }],
      prop4: 327652175423
    };
    this.ngxSmartModalService.setModalData(pen, 'popupOne');

    const book: Object = {
      prop1: 'test',
      prop2: true,
      prop3: [{ a: 'a', b: 'b' }, { c: 'c', d: 'd' }],
      prop4: 327652175423
    };
    this.ngxSmartModalService.setModalData(book, 'popuptwo');
  }

  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }
}
