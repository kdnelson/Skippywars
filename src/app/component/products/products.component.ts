import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../service/productService';
import { CartService } from '../../service/cartService';
import { Product } from '../../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public productList : Product[] = [];
  public filterCategory : any
  public searchKey : string = "";

  constructor(
    private productService : ProductService,
    private cartService : CartService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts()
      .subscribe(response => {
        this.filterCategory = response;
        this.productList?.forEach((product: Product) => {
          Object.assign(product,{quantity:1,total:product.price});
        });
      });

    this.productService.search.subscribe((val:any)=>{
      this.searchKey = val;
    })
  }

  addtocart(product: Product){
    this.cartService.addtoCart(product);
  }

  filter(category: string){  
    this.filterCategory = this.productList
    .filter((product: Product)=>{
      if(product.category == category || category==''){
        return product;
      } else {
        return null;
      }
    })
  }
}
