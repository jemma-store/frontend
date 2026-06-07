import { useEffect } from 'react';

import { useWindowWidth } from '@/lib/hooks/useWindowWidth';
import { AppRoute } from '@/enums';
import { useCatalogStore, useProductStore } from '@/store';
import { Loader } from '@/components/Loader';
import { Banner } from '@/components/Banner';
import { Catalog } from '@/components/Catalog';
import { BreadCrumbs } from '@/components/BreadCrumbs';
import { Sort } from '@/features/products/Sort';
import { Filters } from '@/features/products/Filters';
import { useShallow } from 'zustand/react/shallow';

const PAGE_SIZE = 12;

export const PageLayout = () => {
  const { products, allProducts, loading, isNew, error } = useProductStore();
  const { setTotalPages } = useCatalogStore();
  const { isTablet } = useWindowWidth();
  const fetchProducts = useProductStore((state) => state.fetchProducts);

const filters = useCatalogStore(useShallow((state) => ({ 
        page: state.page,
        sortBy: state.sortBy,
        selectedCategories: state.selectedCategories,
        selectedCollections: state.selectedCollections,
        selectedMaterials: state.selectedMaterials,
        priceRange: state.priceRange,
   })));

  const newProducts = isNew
    ? allProducts.content.filter((product) => product.isNew)
    : products.content;

  useEffect(() => {
    const total = isNew ? newProducts.length : products.page.totalElements;
    setTotalPages(Math.max(1, Math.ceil(total / PAGE_SIZE)));
  }, [isNew, newProducts.length, products.page.totalElements, setTotalPages]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchProducts(signal)

    return () => {
      controller.abort();
    };
  }, [fetchProducts, filters])

  if (loading) return <Loader />;
  if (error) return <div className="text-center py-20 text-error">{error}</div>;

  return (
    <>
      <Banner />
      <div className="container py-3">
        <BreadCrumbs items={[{ label: 'Головна', href: AppRoute.ROOT }, { label: 'Каталог' }]} />
      </div>
      <div className='container'>
          {isTablet? (
          <div>
            <div className='flex mb-10 mt-5'>
              <Filters/>
              <Sort/>
            </div>
            <div className='w-full'>
            {newProducts.length > 0 ? (
              <Catalog data={newProducts} /> 
               ) : (
                <div>Products not found</div>
            )}
            </div>
          </div>) : (
          <div className='flex flex-col lg:grid lg:grid-cols-[0.2fr_1fr] gap-4'> 
            <div className="w-full lg:block">
              <Filters/>
            </div>
              <div className="w-full flex flex-col gap-4"> 
                <Sort/>
                {newProducts.length > 0 ? (
                  <Catalog data={newProducts} /> 
                    ) : (
                        <div>Products not found</div>
                    )}
              </div>
          </div> 
          )}
      </div>
    </>
  );
};
