export interface IItem {
    id: number,
    cartId: number,
    productId: number,
    quantity: number,
}

export interface ICartItem {
  id: number | null,
  userId: number | string | null,
  items: IItem[],
}
