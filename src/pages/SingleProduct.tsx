import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { AppRoute } from '@/enums';
import { fetchProductById, getCollectionByName } from '@/services';
import { setQueryParams } from '@/utils/urlParams';
import { useCatalogStore, useProductStore } from '@/store';
import { Loader } from '@/components/Loader';
import { BreadCrumbs } from '@/components/BreadCrumbs';
import { Info } from '@/features/singleProduct/Info';
import { AlsoBuy } from '@/features/singleProduct/AlsoBuy';
import { useWindowWidth } from '@/lib/hooks/useWindowWidth';

import { StaticProductGallery } from '@/features/singleProduct/StaticProductGallery';
import { MobileProductSwiper } from '@/features/singleProduct/MobileProductSwiper';
import { ProductHeaderMobile } from '@/features/singleProduct/ProductHeaderMobile';
import { ProductMobilePriceDetails } from '@/features/singleProduct/ProductMobilePriceDetails';

export const SingleProduct = () => {
  const {isDesktop, isTablet} = useWindowWidth();
  const { id, category, collection, title } = useParams();
  const numericId = Number(id);
  const { page, sortBy, priceRange, setCategory } = useCatalogStore();
  const {
    loading,
    selectedProduct,
    getProductById,
    setSelectedProduct,
    setLoading,
    setCollectionProducts,
  } = useProductStore();

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const localProduct = getProductById(numericId);

      if (localProduct) {
        setSelectedProduct(localProduct);

        setLoading(false);
      } else {
        try {
          const fetched = await fetchProductById(numericId);
          const currentCategory = useCatalogStore.getState().category;

          if (fetched.categoryName !== currentCategory) {
            setCategory(fetched.categoryName);
          }

          setSelectedProduct(fetched);
        } catch (error) {
          console.error('Помилка завантаження продукту', error);
        } finally {
          setLoading(false);
        }
      }

      if (collection !== null && collection !== undefined) {
        const collectionProducts = await getCollectionByName(collection);
        setCollectionProducts(collectionProducts.products);
        setLoading(false);
      }
    };

    if (!isNaN(numericId)) {
      loadProduct();
    }
  }, [numericId]);

  if (loading) return <Loader />;
  if (!selectedProduct) return <div className="container py-10">Товар не знайдено</div>;

  return (
    <div className="mt-[100px] md:mt-[60px] xl:mt-[100px]">
      <div className="container mb-5 mx-auto md:mb-0 md:py-10 xl:py-10 ">
        <BreadCrumbs
          items={[
            { label: 'Головна', href: AppRoute.ROOT },
            {
              label: category?.toString() || '',
              href: `${AppRoute.PRODUCTS}${setQueryParams({
                page,
                sortBy,
                categories: [category] as string[],
                minPrice: priceRange[0],
                maxPrice: priceRange[1],
              })}`,
            },
            { label: title?.toString() + ` "${collection}"` || '' },
          ]}
        />
      </div>

      <div className="container mx-auto pb-[var(--section-indent)]">
        
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:mb-20 xl:gap-20 ">

          {isTablet || isDesktop? (
            <StaticProductGallery product={selectedProduct} />
          ) : (
            <>
              <ProductHeaderMobile product={selectedProduct}/>
              <MobileProductSwiper product={selectedProduct}/>
              <ProductMobilePriceDetails product={selectedProduct}/>
            </>
          )}

          {selectedProduct ? <Info product={selectedProduct} /> : null}
        </div>

        {selectedProduct ? <AlsoBuy id={numericId} /> : null}
      </div>
    </div>
  );
};