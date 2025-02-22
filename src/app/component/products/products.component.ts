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

  // TODO: type productList in entire file
  public productList : any;
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
        this.productList?.forEach((a:any) => {
          Object.assign(a,{quantity:1,total:a.price});
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
    .filter((a:any)=>{
      if(a.category == category || category==''){
        return a;
      }
    })
  }
}
