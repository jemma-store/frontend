import { useEffect } from 'react';

import {
  AboutUs,
  Certificate,
  Collections,
  Discount,
  Hero,
  NewCollection,
  Sale,
  Feedback,
} from '@/features/main';
import { useProductStore } from '@/store';
import { getAllProducts } from '@/services';

export const HomePage = () => {
  const {
    allProducts,
    setAllProducts,
    loading,
    setLoading,
    hasFetched,
    setHasFetched,
  } = useProductStore();

   useEffect(() => {
    if (hasFetched) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);

        const PAGE = 0;
        const SIZE = 100;

       const filters = {
        page : PAGE,
        size : SIZE
       }

       const res = await getAllProducts(filters);
       setAllProducts(res);
       setHasFetched(true);

      } catch (err) {
        console.error('Помилка завантаження продуктів:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [hasFetched]);

  return (
    <>
      <Hero />
      <Collections />
      <Discount />
      <NewCollection loading={loading} products={allProducts.content} discounted={false} />
      <Sale loading={loading} products={allProducts.content} discounted={true} />
      <Certificate />
      <AboutUs />
      <Feedback />
    </>
  );
};
