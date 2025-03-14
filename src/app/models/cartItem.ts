import { MenuItemOption } from "./menuItemOption";

export class CartItem {
  constructor(
    public id: string,
    public title: string,
    public price: number,
    // TODO: Use with CartItem editing
    // public menuItemOptions?: MenuItemOption[],
    // public menuItemOptionsCount?: number,
    public quantity: number,
    public isSelected: Boolean
  ) {}
}