const ApiEndpoint = {
  PRODUCTS: '/api/products',
  PRODUCTS_SORTED: '/api/products/sorted',
  PRODUCTS_SEARCH: '/api/products/search',
  ORDERS: '/api/orders',
  ORDER_BY_ID: (id: string) => `/api/orders/id/${id}`,
  FORGOT_PASSWORD: '/api/resetPassword',
  CHANGE_PASSWORD: '/api/changePassword',
  USERS: '/api/users',
  USER: '/api/users/token',
  USER_ID: '/api/users/id/:id',
  USER_UPDATE: '/api/users/update',
  USER_UPDATE_ID: '/api/users/update/:id',
  SIGNUP: '/api/users/register',
  USER_VERIFY: '/api/users/register/verify',
  USER_VERIFY_LOGIN: '/api/users/login/verify',
  SIGNIN: '/api/users/login',
  BRANDS: '/api/brands',
  CATEGORIES: '/api/categories',
  COLLECTIONS: '/api/collections',
  ATTRIBUTES: '/api/attributes',
  CART: '/api/cart',
  GUEST_CART: '/api/guest-cart',
  GOOGLE: 'http://ec2-16-170-255-92.eu-north-1.compute.amazonaws.com:8080/oauth2/authorize/google',
  APPLE: '#',
} as const;

export type ApiEndpointPath = (typeof ApiEndpoint)[keyof typeof ApiEndpoint];

export { ApiEndpoint };