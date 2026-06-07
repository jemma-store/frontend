import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

import { AppRoute } from '@/enums';
import { useProductStore } from '@/store';
import { ICertificateItem, IProductItem } from '../types/';
import { Card, CardContent, CardFooter } from './ui';
import { useSmartCart } from '@/lib/hooks/useSmartCart';
import { FavoriteFilledIcon, FavoriteIcon, ShoppingBagFilledIcon, ShoppingBagIcon } from '@/assets';

interface ProductCardProps {
  product: IProductItem;
  certificate?: ICertificateItem;
  size?: 'small' | 'medium' | 'large';
  className?: string;
  isHidden?: boolean;
  discounted?: boolean;
}

export const ProductCard = ({
  product,
  size = "small",
  className,
  isHidden,
  discounted,
}: ProductCardProps) => {
  const { addToCart, removeFromCart, isInCart } = useSmartCart();
  const setFavorites = useProductStore((state) => state.setFavorites);
  const favorites = useProductStore((state) => state.favorites);

  const isFavorite = favorites.includes(product.id);

  const handleCartClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isInCart(product.id) ? removeFromCart(product.id) : addToCart(product);
  };

  const isLarge = size === 'large';
  const isMedium = size === 'medium';

  return (
    <Card
      className={cn(
        'group relative overflow-hidden flex flex-col justify-between transition-all',
        isLarge
          ? 'w-full h-[399px] lg:w-full sm:w-full lg:h-[828px] sm:h-[426px]'
          : isMedium
            ? 'lg:w-full w-full lg:h-[438px] h-[262px]'
            : 'lg:w-full w-full lg:h-[297px] h-[266px]',
        className,
      )}
    
    >
      <CardContent
        className={cn(
          'cursor-pointer flex flex-col items-center justify-end gap-2.5 relative flex-1 shrink-0 mb-3 overflow-hidden border-0 w-full bg-cover bg-center ',
          isLarge
            ? 'lg:h-[593px] h-[383px]'
            : isMedium
              ? 'lg:h-[400px] h-[244px]'
              : 'lg:h-[276px] h-[244px]',
        )}
      >
        <div className="absolute inset-0 bg-black/20 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-2" />

        {product.images
          .map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={product.name}
              className={cn(' object-cover w-full h-full')}
            />
          ))
          .slice(0, 1)}

        <div className="absolute flex flex-col w-full top-2 gap-4 px-2 items-end sm:flex sm:flex-col sm:top-1 sm:items-end sm:opacity-100 xl:top-4 xl:px-5 z-5 xl:opacity-0 xl:group-hover:opacity-100 easy-in-out transition-transform duration-500">
          <button className="btn w-6 h-6" onClick={() => setFavorites(product.id)}>
            {isFavorite ? (
              <FavoriteFilledIcon classname="w-6 h-6" />
            ) : (
              <FavoriteIcon  />
            )}
          </button>

          <button className="btn w-6 h-6" onClick={handleCartClick}>
            {isInCart(product.id) ? (
              <ShoppingBagFilledIcon classname="w-6 h-6" />
            ) : (
              <ShoppingBagIcon classname="w-6 h-6" />
            )}
          </button>
        </div>

        <Link
          to={AppRoute.PRODUCT.replace(':id', product.id.toString())
            .replace(':category', product.categoryName)
            .replace(':collection', product.collectionName)
            .replace(':title', `${product.name}`)}
          className="absolute bottom-2 z-5 xl:bottom-5 xl:opacity-0 xl:group-hover:opacity-100 xl:transition-all xl:duration-300"
        >
          <button className="btn-buy">Купити</button>
        </Link>
      </CardContent>

       
      {isHidden ? null : (
        <CardFooter className="items-center justify-between ">

          <div className="flex justify-between font-medium text-brown-dark ">
            <span>{product.name.split(' ')[0]} </span>

            <span className="text-grey">{`"${product.collectionName}"`}</span>

          </div>

          <div className="text-right lg:text-text text-mobile text-brown-dark">
            {product.price.discountPercentage && discounted ? (
              <>
                <div className="line-through text-grey mb-1">
                  {product.price.normalPrice}&nbsp;грн
                </div> 
                 <div>{product.price.discountedPrice}&nbsp;грн</div> 
              </>
            ) : (
              <div>{product.price.normalPrice}&nbsp;грн</div>
            )}
          </div>
          
        </CardFooter>
      )}
    </Card>
  );
};
