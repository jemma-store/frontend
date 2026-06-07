interface IGuestCartItem {
  productId: number,
  quantity: number,
}

interface IGuestCartResponse {
  response: string;
}

export type {
  IGuestCartItem,
  IGuestCartResponse,
}
