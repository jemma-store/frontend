export interface ICartItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
}

export interface IUserCart {
  id: number;
  userId: number;
  items: ICartItem[];
}

export interface IOrderCreationDTO {
    firstName: string;
    lastName: string;
    fatherName: string;
    phone: string;
    email: string;
    city: string;
    isGift: boolean;  
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}

export interface IOrderRequest {
  userCart: IUserCart;
  orderCreationDTO: IOrderCreationDTO;
}