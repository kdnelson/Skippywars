import { CartItem } from "./cartItem";

export class Cart {
  constructor(
    public id: String,
    public counter: number,
    // TODO add this back in
    //public createdDate: Date,
    public subTotal: number,
    public tax: number,
    public total: number,
    public cartItems?: CartItem[],
  ){}
}