import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AppRoute } from '@/enums';
import { Layout } from '@/layouts';
import {
  Cart,
  Favorite,
  HomePage,
  Catalog,
  CompareProductsPage,
  PublicAgreement,
  SingleProduct,
  PrivacyPolicy,
  UserAccount,
  Checkout,
  AuthRegister,
  AuthLogin,
  UserAgreement,
  SuccessfulRegister,
  Certificates,
  NotFound,
} from '@/pages';
import {
  UserData,
  UserFavorites,
  UserOrders,
  UserReviews,
  UserScales,
} from '@/features/dashboard';
import { SingleCertificate } from '@/pages/SingleCertificate';
import { OrderCreatedSuccess } from '@/pages/OrderCreatedSuccess';
import AdminPage from '@/pages/adminPages/AdminPage';
import { DashboardPage } from '@/pages/adminPages/DashboardPage';
import { ProductsPage } from '@/pages/adminPages/ProductsPage';
import { OrdersPage } from '@/pages/adminPages/OrdersPage';
import { UsersPage } from '@/pages/adminPages/UsersPage';
import { OrderInfo } from '@/pages/adminPages/OrderInfo';
import { AddNewProduct } from '@/admin-panel/features/products/AddNewProduct';
import { UserInfoPage } from '@/pages/adminPages/UserInfoPage';
import { UserReviewsPublished } from '@/features/dashboard/UserRiviewsPublished';
import { UserReviewsPending } from '@/features/dashboard/UserReviewsPending';
import { DraftsPage } from '@/pages/adminPages/DraftsPage';
import { EditProductPage } from '@/admin-panel/features/products/EditProductPage';

export const routes = createBrowserRouter([
  {
    path: AppRoute.ROOT,
    element: <Layout />,
    children: [
      { path: AppRoute.ROOT, element: <HomePage /> },
      { path: AppRoute.PRODUCTS, element: <Catalog /> },
      { path: AppRoute.PRODUCT, element: <SingleProduct /> },
      { path: AppRoute.FAVORITE, element: <Favorite /> },
      { path: AppRoute.SCALE, element: <CompareProductsPage /> },
      { path: AppRoute.PUBLIC, element: <PublicAgreement /> },
      { path: AppRoute.PRIVACY, element: <PrivacyPolicy /> },
      { path: AppRoute.USER_AGREEMENT, element: <UserAgreement /> },
      { path: AppRoute.SUCCESS, element: <SuccessfulRegister /> },
      { path: AppRoute.ADMIN,
        element : <AdminPage />,
        children : [
          {
            index : true,
            element : <DashboardPage/>
          },
          {
            path: AppRoute.ADMIN_DASHBOARD,
            element: <DashboardPage/>
          },
          {
            path : AppRoute.ADMIN_PRODUCTS,
            element : <ProductsPage/>
          },
          {
            path : AppRoute.ADMIN_DRAFTS,
            element : <DraftsPage/>
          },
          {
            path : AppRoute.ADMIN_PRODUCTS_EDIT,
            element : <EditProductPage/>
          },
          {
            path : AppRoute.ADMIN_ADD_NEW_PRODUCT,
            element : <AddNewProduct disabled={false}/>
          },
          {
            path : AppRoute.ADMIN_ORDERS,
            element : <OrdersPage/>,
          },
          {
            path : AppRoute.ADMIN_ORDERS_ORDER_INFO,
            element : <OrderInfo />
          },
          {
            path : AppRoute.ADMIN_USERS,
            element : <UsersPage/>
          },
          {
            path : AppRoute.ADMIN_USERINFO_PAGE,
            element : <UserInfoPage/>
          }
        ]
      },
      {
        path: AppRoute.SIGN_IN,
        element: <AuthLogin />,
      },
      {
        path: AppRoute.SIGN_UP,
        element: <AuthRegister />,
      },
      {
        path: AppRoute.CART,
        element: <Cart />,
      },
      {
        path: AppRoute.CERTIFICATES,
        element: <Certificates />,
      },
      {
        path: AppRoute.CERTIFICATE,
        element: <SingleCertificate />,
      },
      {
        path: AppRoute.USER_DATA,
        element: <UserAccount />,
        children: [
          {
            path: AppRoute.USER_DATA,
            element: <UserData />,
          },
          {
            path: AppRoute.USER_FAVORITES,
            element: <UserFavorites />,
          },
          {
            path: AppRoute.USER_PROFILE,
            element : <UserData />
          },
          {
            path: AppRoute.USER_ORDERS,
            element: <UserOrders />,
          },
          {
            path: AppRoute.USER_REVIEWS,
            element: <UserReviews />,
            children : [
              {
                index : true,
                element : <Navigate to={AppRoute.USER_REVIEWS_PUBLISHED} replace />
              },
              {
                path : AppRoute.USER_REVIEWS_PUBLISHED,
                element : <UserReviewsPublished/>,
              },
               {
                path : AppRoute.USER_REVIEWS_PENDING,
                element : <UserReviewsPending/>
              },
            ]
          },
          {
            path: AppRoute.USER_SCALES,
            element: <UserScales />,
          },
        ],
      },
      {
            path: AppRoute.USER_COMPARE,
            element: <CompareProductsPage />,
      },
      {
        path: AppRoute.CHECKOUT,
        element: <Checkout />,
      },
      {
            path : AppRoute.ORDER_SUCCESS,
            element : <OrderCreatedSuccess/>
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
