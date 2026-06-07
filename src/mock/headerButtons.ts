import { AppRoute } from '@/enums';
import { FavoriteIcon, MenuIcon, ScalesIcon, SearchIcon, ShoppingBagIcon, UserIcon } from '@/assets';

export const headerButtons = [
  {
    title: 'search',
    href: '#',
    icon: SearchIcon,
    type: 'fill',
  },
  {
    title: 'user',
    href: AppRoute.USER_DATA,
    activePath : [AppRoute.USER_DATA, AppRoute.SIGN_IN, AppRoute.SIGN_UP],
    icon: UserIcon,
    type: 'fill',
  },
  {
    title: 'favorite',
    icon: FavoriteIcon,
    href: AppRoute.USER_FAVORITES,
    type: 'fill',
  },
  {
    title: 'scale',
    href: AppRoute.USER_SCALES,
    icon: ScalesIcon,
    type: 'fill',
  },
  {
    title: 'shoppingBag',
    icon: ShoppingBagIcon,
    href: AppRoute.CART,
    type: 'stroke',
  },
  {
    title : "admin",
    href : AppRoute.ADMIN,
    icon : UserIcon,
    type : "fill"
  }
];

export const headerButtonsMobile = [
  {
    title: 'search',
    href: '#',
    icon: SearchIcon,
    type: 'fill',
  },
  {
    title: 'shoppingBag',
    icon: ShoppingBagIcon,
    href: AppRoute.CART,
    type: 'stroke',
  },
  {
    title: 'menuIcon',
    icon: MenuIcon,
    href: AppRoute.CART,
    type: 'stroke',
  },
    {
    title : "admin",
    href : AppRoute.ADMIN,
    icon : UserIcon,
    type : "fill"
  }
];

export const burgerButtons = [
  {
    title: 'user',
    href: AppRoute.USER_DATA,
    icon: UserIcon,
    type: 'fill',
  },
  {
    title: 'favorite',
    icon: FavoriteIcon,
    href: AppRoute.USER_FAVORITES,
    type: 'fill',
  },
  {
    title: 'scale',
    href: AppRoute.USER_SCALES,
    icon: ScalesIcon,
    type: 'fill',
  },
    {
    title : "admin",
    href : AppRoute.ADMIN,
    icon : UserIcon,
    type : "fill"
  }
]
