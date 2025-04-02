import { OptionItem } from "./optionItem";

export class CartItem {
  constructor(
    public id: string,
    public title: string,
    public price: number,
    // TODO: Use with CartItem and add to subtotal
    // public optionItem?: OptionItem[],
    public quantity: number,
    public isSelected: Boolean
  ) {}
}