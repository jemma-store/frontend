import { useEffect, useCallback } from 'react';
import { Outlet, useSearchParams, useLocation} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { LocalStorage } from '@/enums';
import { localStorageService } from '@/api';
import { getUserProfile } from '@/services/authService';
import { getQueryParams } from '@/utils/urlParams';
import { 
  getAllCategories, 
  getAllCollections, 
  getSearchProducts, 
} from '@/services';
import {
  useUserStore,
  useAuthStore,
  useProductStore,
  useCartStore,
  useCatalogStore,
  useGuestCartStore,
} from '@/store';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Notification } from '@/components/Notification';
import { PopUpCart } from '@/features/cart/PopUpCart';
import { PopUpDeleteFromCart } from '@/features/cart/PopUpDeleteFromCart';
import { PopUpConfirmationPhone } from '@/features/auth/ConfirmationPhone';
import type { IUserItem } from '../types/user';
import { ScrollToTop } from '@/utils/scrollToTop';

export const Layout = () => {

  const accessToken = useAuthStore((state) => state.accessToken);
  const logout = useAuthStore((state) => state.logout);
  const setUser = useUserStore((state) => state.setUser);
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");
  
  const { setProducts, setLoading, setIsNew } = useProductStore();
  const {
    setCategories,
    setCollections,
    setPage,
    setSort,
    setSearch,
    setSelectedCategories,
    setSelectedCollections,
    setSelectedMaterials,
    setPriceRange,
    setTotalPages,
  } = useCatalogStore();

  const [searchParams] = useSearchParams();
  const isNewFromUrl = searchParams.get('isNew') === 'true';

  useEffect(() => {

   let currentSession = localStorage.getItem(LocalStorage.SESSION_ID);

    if (!currentSession) {
      currentSession = crypto.randomUUID();
      localStorage.setItem(LocalStorage.SESSION_ID, currentSession);
      document.cookie = `guest_id=${currentSession}; path=/; max-age=31536000; SameSite=Lax`;
    }
    
    localStorage.setItem(LocalStorage.GUEST_CART_ID, currentSession);

    const query = getQueryParams(searchParams);

    if (query.page) setPage(query.page);
    if (query.query) setSearch(query.query);
    if (query.categories) setSelectedCategories(query.categories);
    if (query.collections) setSelectedCollections(query.collections);
    if (query.materials) setSelectedMaterials(query.materials);
    if (query.sortBy) setSort(query.sortBy);
    if (query.minPrice !== undefined && query.maxPrice !== undefined)
      setPriceRange([query.minPrice, query.maxPrice]);

    const initializeApp = async () => {
      try {
        setLoading(true);
        const user = await initUser();
        await initCart(user);
        initFavorites();

        const [products, categories, collections] = await Promise.all([
          getSearchProducts({
            page: query.page || 1,
            size: 12,
            query: query.query || '',
            maxPrice: query.maxPrice || 0,
            minPrice: query.minPrice || 0,
            categories: query.categories || [],
            collections: query.collections || [],
            materials: query.materials || [],
            sortBy: query.sortBy || '',
          }),
          getAllCategories(),
          getAllCollections(),
        ]);

        setIsNew(isNewFromUrl);

        if(!isAdminPage) {
          setProducts(products);
        }

        setCategories(categories);
        setCollections(collections);
        setTotalPages(products.page.totalPages);
      } catch (err) {
        console.error('Критична помилка ініціалізації:', err);
        logout(); 
      } finally {
        setLoading(false);
      }
    };

    initializeApp();

  }, [accessToken]); 

  const initUser = async () => {
    if (!accessToken) return null;
    try {
      const user = await getUserProfile(); 
      setUser(user)
      return user;
      
    } catch (err) {
      console.error('Сесія застаріла або невірна:', err);
      logout(); 
      return null;
    }
  };

 const initCart = async (currentUser: IUserItem | null) => {
  try {
    if (currentUser && currentUser.role !== "ADMIN") {
      await useCartStore.getState().fetchCart();
    } 
    else if (!currentUser) {
      const guestCartId = localStorage.getItem(LocalStorage.GUEST_CART_ID);
      if (!guestCartId) {
        await useGuestCartStore.getState().createGuestCart();
      } else {
        await useGuestCartStore.getState().fetchGuestCart();
      }
    }
  } catch (error) {
    console.error('Помилка при ініціалізації кошика:', error);
  }
};

  const initFavorites = useCallback(() => {
    const storedFavorites = localStorageService.getItem<number[]>(LocalStorage.FAVORITE_PRODUCTS);
    if (!storedFavorites) {
      localStorageService.setItem(LocalStorage.FAVORITE_PRODUCTS, []);
      useProductStore.setState({ favorites: [] });
    } else {
      useProductStore.setState({ favorites: storedFavorites });
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      <div className='scroll-smooth'>
        <ScrollToTop />
      </div>
      <Header />
      <main className="flex-grow w-full h-full">
        <Outlet />
      </main>
      <PopUpConfirmationPhone />
      <PopUpDeleteFromCart />
      <PopUpCart />
      <Notification />
      <ToastContainer />
      {isAdminPage ? null : <Footer/>}
    </div>
  );
};