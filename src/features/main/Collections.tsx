import { Link } from 'react-router-dom';

import { AppRoute } from '@/enums';
import { useCatalogStore } from '@/store';
import { setQueryParams } from '@/utils/urlParams';
import { Card, CardContent } from '@/components/ui';

export const Collections = () => {
  const { collections, page, sortBy, priceRange } = useCatalogStore();

  const mainCollection = collections.find((c) => c.name.toLowerCase() === 'heart');
  const secondaryCollections = collections
  .filter((c) => c.name.toLowerCase() !== 'heart')
  .slice(0, 4);
  
  return (
    <section className="relative w-full section-indent">
      <div className="container ">
        <h2 className="text-center mb-10 sm:text-[54px]">Наші неповторні колекції</h2>

        <div className="w-full h-full flex items-start justify-between xl:gap-5 gap-2">
          {mainCollection && (
            <Card className="sm:w-[350px] sm:h-[426px] xl:w-[649px] xl:h-[790px] w-[175px] h-[214px] shrink-0 group">
              <CardContent className="relative w-full h-full overflow-hidden">
                <div className="flex flex-col w-full h-full items-center bg-cover bg-center">
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                  {mainCollection.products[0]?.images && (
                    <img
                      className="absolute w-full h-full object-cover scale-100 group-hover:scale-107 transition-all duration-300 brightness-70"
                      src={mainCollection.products[2]?.images[1]?.url}
                      alt={mainCollection.name}
                    />
                  )}

                  <Link
                    to={`${AppRoute.PRODUCTS}${setQueryParams({
                      page,
                      collections: [mainCollection.name],
                      sortBy: sortBy,
                      minPrice: priceRange[0],
                      maxPrice: priceRange[1],
                    })}`}
                    className="w-full text-center absolute left-0 bottom-1 xl:bottom-5 z-20 opacity-100 transition-all duration-300"
                  >
                    <h1 className="w-full text-main text-center sm:text-[60px]">HEART</h1>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="w-full grid grid-cols-2 gap-1.5 sm:gap-3 xl:gap-5 items-start justify-between">
            {secondaryCollections.map((collection) => (
              <Card
                key={collection.id}
                className="sm:h-[206px] xl:w-full xl:h-[385px] w-full h-[104px] shrink-0 overflow-hidden group"
              >
                <CardContent className="w-full h-full relative overflow-hidden">
                  <div className="flex flex-col h-full items-center w-full bg-cover bg-center">
                    {collection.products[0]?.images && (
                      <img
                        className="absolute w-full h-full object-cover scale-100 group-hover:scale-107 transition-all duration-300 brightness-70"
                        src={collection.products[0]?.images[0]?.url}
                        alt={collection.name}
                      />
                    )}

                    <Link
                      to={`${AppRoute.PRODUCTS}${setQueryParams({
                        page,
                        collections: [collection.name],
                        sortBy: sortBy,
                        minPrice: priceRange[0],
                        maxPrice: priceRange[1],
                      })}`}
                      className="w-full text-center absolute bottom-1 xl:bottom-5 left-0 z-20 opacity-100 transition-all duration-300  sm:mb-2"
                    >
                      <h1 className="w-full text-main text-center text-[20px] xl:text-heading1 sm:text-[40px]">
                        {collection.name}
                      </h1>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


