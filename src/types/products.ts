import { IProductItem } from "./product";

export interface IProducts {
  content: IProductItem[],
  page: {
    size: number,
    number: number,
    totalElements: number,
    totalPages: number
  }
}