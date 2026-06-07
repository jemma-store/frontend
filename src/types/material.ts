import { IProductItem } from "./product";

export interface IMaterialItem {
  id: number,
  name: string,
  description: string,
  products: IProductItem[],
}