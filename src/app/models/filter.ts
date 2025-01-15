import { FilterOption } from "./filterOption";

export class Filter {
    constructor(
      public id?: string,
      public name?: string,
      public isSelected?: boolean,
      public filterOption?: FilterOption
    ) { }
  }