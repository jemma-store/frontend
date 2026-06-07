export {
  handleAuthError,
  login,
  verifyPhoneLogin,
  verifyPhoneNumber,
  useRegister,
  refreshAccessToken,
  registerUser
} from './authService';

export {
  getAllProductsFromCartService,
  getProductFromCartService,
  addToCartService,
  removeFromCartService,
  changeQuantityCartService,
  clearCartService
} from './cartService';

export {
  getAllProducts,
  fetchProductById,
  getProductBySku,
  deleteProductById,
  getSortedProducts,
  getSearchProducts,
} from './productService';

export {
  getAllUsers,
  getUserByToken,
  updateUser,
  updateUserId
} from './userService';

export {
  getAllCollections,
  getCollectionByName,
  getCollectionById,
  updateCollection,
  createCollection,
  deleteCollection,
} from './collectionService';

export {
  getAllCategories,
  getCategoryByName,
  getCategoryById,
  updateCategory,
  createCategory,
  deleteCategory,
} from './categoryService';

export { getOrCreateGuestId, removeGuestId } from './guestService';

export {
  getProductFromGuestCartService,
  addToGuestCartService,
  removeFromGuestCartService,
  changeQuantityGuestCartService,
  clearGuestCartService
} from './guestCartService';

export { createOrderService, createOrderGuestService } from './orderService';