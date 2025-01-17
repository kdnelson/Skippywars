import { Cart } from "./cart";
import { CartItem } from "./cartItem";
import { Filter } from "./filter";
import { MenuItem } from "./menuItem";

export class StoreState {
  filter: Filter | undefined;
  filters: Filter[] | undefined;
  menuItem: MenuItem | undefined;
  menuItems: any;
  cart: Cart | undefined;
  cartItem: CartItem | undefined;
  cartItems: CartItem[] | undefined;
}