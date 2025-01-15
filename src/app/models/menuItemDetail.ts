import { MenuItemOption } from './menuItemOption';

export class MenuItemDetail {
  constructor(
    public id?: String,
    public name?: String,
    public menuItemOptions?: MenuItemOption[],
    public cost?: number,
    public totalCost?: number
  ){}
}