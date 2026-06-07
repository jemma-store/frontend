import { Link } from 'react-router-dom';

import { AppRoute } from '@/enums';
import { DiscountImage } from '@/assets';
import { Card, CardContent } from '@/components/ui';
import { setQueryParams } from '@/utils/urlParams';
import { useCatalogStore } from '@/store';

export const Discount = () => {
  const { page, sortBy, priceRange } = useCatalogStore();

  return (
    <section className="relative w-full lg:h-[700px] min-h-[432px] h-full bg-cover bg-center flex items-center justify-center section-indent">
      <img className="absolute w-full h-full object-cover" src={DiscountImage} alt="Hero Image" />

      <Card className="bg-transparent z-5 text-main w-[550px]">
        <CardContent className="flex flex-col items-center justify-center gap-10 p-0">
          <h2 className="text-center">
            Знижка на перше <span className="md:inline block">замовлення</span>
            <span className="block">-5%</span>
          </h2>

          <Link
            to={`${AppRoute.PRODUCTS}${setQueryParams({
              page,
              sortBy: sortBy,
              minPrice: priceRange[0],
              maxPrice: priceRange[1],
            })}`}
            className="inline-block lg:static absolute bottom-4 left-50%"
          >
            <button className="btn-buy">Купити</button>
          </Link>
        </CardContent>
      </Card>
    </section>
  );
};
