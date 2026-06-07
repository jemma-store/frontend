import { Link } from 'react-router-dom';
import cn from 'classnames';

import { AppRoute } from '@/enums';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { useModalStore, useCatalogStore } from '@/store';
import { setQueryParams } from '@/utils/urlParams';
import { useSmartCart } from '@/lib/hooks/useSmartCart';
import { CardCart } from './CardCart';

export const PopUpCart = () => {
  const { openModal, close } = useModalStore();
  const { cartItemsWithData } = useSmartCart();
  const { page, sortBy, priceRange } = useCatalogStore();

  const isOpen = openModal === 'cart' || openModal === 'deleteFromCart';

  const total = cartItemsWithData.reduce(
    (sum, { product, quantity }) =>
      sum + (product.price.discountedPrice ?? product.price.normalPrice) * quantity,
    0,
  );

  return (
    <Dialog open={isOpen} onOpenChange={close} >
      <DialogTrigger className="hidden" />
      <DialogContent
        className={cn(
          'flex flex-col items-center p-5 !shadow-mainv',
          cartItemsWithData.length > 0 ? 'w-full gap-7 h-full mt-20 md:max-w-[650px] md:max-h-[750px] md:m-0' : 'max-w-[363px] gap-15',
        )}
      >
        <DialogTitle className="w-full text-center text-second font-[500] font-main mt-8">
          Кошик
        </DialogTitle>

        <DialogDescription className="hidden" />

        <div className="w-full text-center">
          {cartItemsWithData && cartItemsWithData.length > 0 ? (
            <div className="w-full flex flex-col gap-1">
              <div className="flex flex-col gap-7 overflow-y-auto max-h-[440px] custom-scroll">
                {cartItemsWithData.map(({ product, quantity }) => {

                  if (!product) return null;

                  return <CardCart key={product.id} item={product} quantity={quantity} itemId={product.id} />;
                })}
              </div>
            </div>
          ) : (
            <span className="w-full text-center">У вас немає товарів у кошику</span>
          )}
        </div>

        {cartItemsWithData && cartItemsWithData.length > 0 && (
          <div className="w-full pt-7 border-t border-brown-dark flex items-center justify-between">
            <span className="text-second  font-[500] font-main text-brown-dark">Разом</span>{' '}
            <span className="font-third text-[24px] text-button">{total?.toFixed(2)} грн</span>
          </div>
        )}

        <DialogFooter className="w-full">
          {cartItemsWithData && cartItemsWithData.length > 0 ? (
            <div className="flex flex-col items-center gap-8 md:flex-row md:gap-5 md:mr-4">
              <Button variant="outline" className="w-full order-2 md:order-0 md:flex-grow md:basis-1/2" asChild onClick={() => close()}>
                <Link
                  to={`${AppRoute.PRODUCTS}${setQueryParams({
                    page,
                    sortBy: sortBy,
                    minPrice: priceRange[0],
                    maxPrice: priceRange[1],
                  })}`}
                >
                  Продовжити покупки
                </Link>
              </Button>

              <Button className="w-full md:flex-grow md:basis-1/2" asChild onClick={() => close()}>
                <Link to={AppRoute.CHECKOUT}>Оформити замовлення</Link>
              </Button>
            </div>
          ) : (
            <Button className="w-[307px]" asChild onClick={() => close()}>
              <Link
                to={`${AppRoute.PRODUCTS}${setQueryParams({
                  page,
                  sortBy: sortBy,
                  minPrice: priceRange[0],
                  maxPrice: priceRange[1],
                })}`}
              >
                Переглянути каталог
              </Link>
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
