export class Product {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public price: number,
    public quantity: number,
    public category: string,
  ){}
}