import { Link } from 'react-router-dom';

import { AppRoute } from '@/enums';
import { useCatalogStore } from '@/store';
import { setQueryParams } from '@/utils/urlParams';
import { Button } from '@/components/ui';
import NotFoundImage from '/images/404.png';

export const NotFound = () => {
  const { page, sortBy, priceRange } = useCatalogStore();

  return (
    <section className="w-full h-screen bg-[url('/images/bg.jpg')] bg-cover">
      <div className="container h-full flex flex-col items-center justify-center py-20">
        <img src={NotFoundImage} alt="image 404" />

        <p className="max-w-[475px] text-center text-second font-medium mb-9">
          Нам дуже прикро, але сторінку не знайдено. Можливо, вас зацікавлять інші наші колекції.
        </p>

        <Button className="w-[259px]" asChild>
          <Link
            to={`${AppRoute.PRODUCTS}${setQueryParams({
              page,
              sortBy,
              minPrice: priceRange[0],
              maxPrice: priceRange[1],
            })}`}
          >
            До каталогу
          </Link>
        </Button>
      </div>
    </section>
  );
};
