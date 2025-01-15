import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { CartModalComponent } from './../cart-modal/cart-modal.component';
import { CartService } from '../../service/cart.service-old';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit, OnInit {
  constructor(
    private cartService: CartService,
    private cartModalComponent: CartModalComponent,
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

  openCartModal() {
    let methodName: string = 'openCartModal';

    try {
      //this.closeAllModals();
      //if(this.cartItemService.getCartCount() > 0){
        this.cartModalComponent.loadModal();
      //}
    } catch (errMsg) {
      // let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      // this.logService.logHandler(errorMsg);
    }
  }
}
