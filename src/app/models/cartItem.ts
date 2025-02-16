import { MenuItemOption } from "./menuItemOption";

export class CartItem {
  constructor(
    public id?: String,
    public name?: String,
    public quantity?: number,
    public price?: number,
    // TODO: Use with CartItem editing
    // public menuItemOptions?: MenuItemOption[],
    // public menuItemOptionsCount?: number,
    public isSelected?: Boolean
  ) { }
}