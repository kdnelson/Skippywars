import { CartItem } from "./cartItem";

export class Cart {
  constructor(
    public id?: String,
    public counter?: number,
    public createdDate?: Date,
    public cartItems?: CartItem[],
    public subTotal?: number,
    public tax?: number,
    public total?: number
  ){}
}