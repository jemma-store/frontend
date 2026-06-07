import { AppRoute } from '@/enums';
import {
  CheckCircleIcon,
  FavoriteIcon,
  ScalesIcon,
  OrderHistory,
  ReviewsIcon
} from '@/assets';

export const menuItems = [
  {
    icon: <CheckCircleIcon/>,
    text: 'Особисті дані',
    href: AppRoute.USER_PROFILE,
  },
  {
    icon: <OrderHistory/>,
    text: 'Історія замовлень',
    href: AppRoute.USER_ORDERS,
  },
  {
    icon: <ReviewsIcon/>,
    text: 'Відгуки',
    href: AppRoute.USER_REVIEWS_PUBLISHED,
    basePath: '/dashboard/reviews',
  },
  {
    icon: <FavoriteIcon/>,
    text: 'Список бажань',
    href: AppRoute.USER_FAVORITES,
  },
  {
    icon: <ScalesIcon/>,
    text: 'Список порівнянь',
    href: AppRoute.USER_SCALES,
  },
];
