import { MenuItemOption } from "./menuItemOption";

export class CartItem {
  constructor(
    public id?: String,
    public name?: String,
    public quantity?: number,
    public price?: number,
    public totalPrice?: number,
    public menuItemOptions?: MenuItemOption[],
    public menuItemOptionsCount?: number,
    public isSelected?: Boolean
  ) { }
}