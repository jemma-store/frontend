import { Link } from 'react-router-dom';

import { AppRoute } from '@/enums';
import { IProductItem } from '@/types/';
import { useProductStore } from '@/store';
import { Loader } from '@/components/Loader';
import { ProductCard } from '@/components/ProductCard';
import { Card, CardContent, CardFooter } from '@/components/ui';
import { FavoriteFilledIcon, FavoriteIcon, ShoppingBagFilledIcon, ShoppingBagIcon } from '@/assets';
import { useSmartCart } from '@/lib/hooks/useSmartCart';

export const NewCollection = ({
  loading,
  products,
  discounted,
}: {
  loading: boolean;
  discounted: boolean;
  products: IProductItem[];
}) => {
  // const newCol = products.filter((p) => p.isNew === true);
  const { addToCart, removeFromCart, isInCart } = useSmartCart();
  const setFavorites = useProductStore((state) => state.setFavorites);

  const favorites = useProductStore((state) => state.favorites);
  const visibleProducts = products.slice(4,7);

  const firstProduct = visibleProducts[0];
  const isInFavoriteFirst = favorites.includes(firstProduct?.id);
  const isInCartFirst = isInCart(firstProduct?.id);

  if (loading) return <Loader />;

  return (
    <section className="relative w-full section-indent">
      <h2 className="text-center xl:mb-[61px] mb-[36px]">Колекція весна 2025</h2>

      <div className="container grid grid-cols-1 sm:grid sm:grid-cols-2 sm:gap-5">
        {firstProduct && (
          <Card className="w-full xl:w-[650px] group border-0">
            <CardContent className="relative mb-3 overflow-hidden border-0">
              <div className="flex flex-col h-[429px] w-full xl:h-[790px] xl:w-full sm:h-[456px] sm:w-full  items-center justify-end gap-2.5 relative bg-cover bg-center">
                <div className="absolute inset-0 bg-black/20 opacity-0 xl:group-hover:opacity-100 transition-opacity duration-500 z-2" />

                {firstProduct.images
                  .map((image, index) => ( 
                    <img
                      key={index}
                      className="absolute w-full h-full object-cover xl:group-hover:scale-105 ease-in-out transition-transform duration-500"
                      src={image.url}
                      alt={firstProduct.name}
                    />
                  ))
                  .slice(0, 1)}

                <div className="absolute w-full top-2 xl:top-5 left-0 flex items-center justify-between xl:justify-end gap-5 px-2 xl:px-5 z-5 xl:opacity-0 xl:group-hover:opacity-100 translate-y-2 xl:group-hover:translate-y-0 transition-all duration-300">
                  <button className="btn w-6 h-6" onClick={() => setFavorites(firstProduct?.id)}>
                    {isInFavoriteFirst ? (
                      <FavoriteFilledIcon classname="w-6 h-6" />
                    ) : (
                      <FavoriteIcon  />
                    )}
                  </button>

                  <button
                    className="btn w-6 h-6"
                    onClick={() =>
                      isInCartFirst ? removeFromCart(firstProduct.id) : addToCart(firstProduct)
                    }
                  >
                    {isInCartFirst ? (
                      <ShoppingBagFilledIcon classname="w-6 h-6" />
                    ) : (
                      <ShoppingBagIcon classname="w-6 h-6 text-brown-dark" />
                    )}
                  </button>
                </div>

                <Link
                  to={AppRoute.PRODUCT.replace(':id', firstProduct.id.toString())
                    .replace(':category', firstProduct.categoryName)
                    .replace(':collection', firstProduct.collectionName)
                    .replace(':title', `${firstProduct.name}`)}
                  className="absolute xl:bottom-5 bottom-4 z-5 xl:opacity-0 xl:group-hover:opacity-100 transition-all duration-300"
                >
                  <button className="btn-buy">Купити</button>
                </Link>
              </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between">
              <div className="font-medium text-brown-dark">
                <span>{firstProduct.name} </span>
                <span className="text-grey">"{firstProduct.collectionName}"</span>
              </div>

              <div className="whitespace-nowrap xl:text-second text-mobile">
                {firstProduct.price.normalPrice}&nbsp;грн
              </div>
            </CardFooter>
          </Card>
        )}
        <div className="grid grid-cols-1">
          <div className="flex flex-row justify-between xl:gap-4 gap-2 mt-2 sm:mt-0 xl:mt-0">
            {visibleProducts.slice(1).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                size="small"
                className="xl:h-[438px] xl:w-full sm:h-[221px] sm:w-full h-[244px] w-full transition-transform duration-500 ease-in-out hover:scale-105"
                discounted={discounted}
              />
            ))}
          </div>

            <div className="mt-auto ml-auto relative max-w-[290px] hidden sm:block xl:block">
            Почни весну з блиску, який не тільки прикрашає, але і змінює настрій!
          </div>
        
        </div>
      </div>
    </section>
  );
};
