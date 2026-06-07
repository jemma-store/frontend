export interface IReviewItem {

  id: number,
  productId : number;
  productCategory: string,
  productCollection: string;
  productTitle: string;
  rating: number;
  date: string;
  text: string;
  customerName: string;
  location: string;
  image?: string;
  hasProductImage?: boolean;
  avatar?: string;
}
