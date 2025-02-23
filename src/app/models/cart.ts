import { CartItem } from "./cartItem";

export class Cart {
  constructor(
    public id: string,
    public mediaSize: string,
    public counter: number,
    public subTotal: number,
    public tax: number,
    public total: number,
    public cartItems?: CartItem[],
  ){}
}
