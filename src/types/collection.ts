import { IProductItem } from "./product";

export interface ICollectionItem {
  id: number,
  name: string,
  description: string,
  products: IProductItem[],
}