import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  public search = new BehaviorSubject<string>("");

  constructor(private http : HttpClient) {}

  getProducts() {
    return this.http.get<Product>("https://fakestoreapi.com/products")
    .pipe(map((res:Product)=>{
      return res;
    }))
  }
}
