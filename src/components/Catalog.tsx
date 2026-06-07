import { FC } from 'react';

import { IProductItem } from '@/types/';
import { useProductStore } from '@/store';
import { Pagination } from '@/features/products/Pagination';
import { ProductCard } from './ProductCard';
import { CardSkeleton } from './CardSkeleton';
import { useCatalogStore } from '@/store';
import { useSearchParams } from 'react-router-dom';

interface ICatalogProps {
  data: IProductItem[];
}

export const Catalog: FC<ICatalogProps> = ({ data }) => {
  const { loading, products} = useProductStore((state) => state);
  const {page, setPage} = useCatalogStore()
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (clickedPage: number) => {
      setPage(clickedPage);
      const params = new URLSearchParams(searchParams);
      params.set('page', clickedPage.toString());
      setSearchParams(params);
  };

  console.log("Поточна сторінка з бекенду:", products.page.number);
console.log("Поточна сторінка з CatalogStore:", page);

  return (
    <>
      <div
        className='grid grid-cols-2 gap-3 md:grid md:grid-cols-4 md:gap-5 xl:grid xl:grid-cols-4 '
      >
        {loading
          ? Array.from({ length: 12 }).map((_, index) => (
              <CardSkeleton key={index} size="small" className="col-span-1 row-span-1" />
            ))
          : data.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                size="small"
                className="col-span-1 row-span-1"
              />
            ))}
      </div>

      <Pagination 
        totalPages={products.page.totalPages}
        currentPage={products.page.number + 1}
        onChange={handlePageChange}
      />
    </>
  );
};
