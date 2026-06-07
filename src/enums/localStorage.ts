const LocalStorage = {
  ACCESS_TOKEN_KEY: 'access_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
  CART_PRODUCTS: 'cart_items',
  CART_TOTAL_AMOUNT: 'cart_total_amount',
  CART_QUANTITY: 'cart_quantity',
  FAVORITE_PRODUCTS: 'favorites',
  SCALES_PRODUCTS : "scales",
  FAVORITE_CERTIFICATES: 'favorites_certificates',
  GUEST_ID: 'guest_id',
  GUEST_CART_ID: 'GUEST_CART_ID',
  SESSION_ID: 'SESSION_ID',
  CARDS: 'cards',
} as const;

export type LocalStoragePath = (typeof LocalStorage)[keyof typeof LocalStorage];

export { LocalStorage };