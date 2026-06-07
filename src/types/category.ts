import { IProductItem } from "./product";

export interface ICategoryItem {
  id: number,
  name: string,
  description: string,
    products: IProductItem[],
}