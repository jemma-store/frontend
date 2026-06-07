import { useState } from 'react';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { AppRoute } from '@/enums';
import { IProductItem } from '@/types/';
import { useProductStore } from '@/store';
import { useSmartCart } from '@/lib/hooks/useSmartCart';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
} from '@/components/ui';
import { FavoriteFilledIcon, FavoriteIcon, InfoIcon, ScalesIcon } from '@/assets';
import { useWindowWidth } from '@/lib/hooks/useWindowWidth';

export const Info = ({ product }: { product: IProductItem }) => {
  const {isDesktop, isTablet} = useWindowWidth();
  const [active, setActive] = useState(product.productSizes?.[0] ?? null);
  const { addToCart } = useSmartCart();
  const setFavorites = useProductStore((state) => state.setFavorites);
  const favorites = useProductStore((state) => state.favorites);

  const isFavorite = favorites.includes(product.id);

  const handleActive = (size: number) => setActive(size);

  const handleBuy = ({ product }: { product: IProductItem }) => {
    addToCart(product);
  };

  return (
    <div className="flex flex-col w-full items-start gap-4 md:gap-6">
      <div className="flex-col items-end gap-7 flex relative self-stretch w-full">

    {/* нижче іде умовний рендерінг, щоб правильно відображалась верстка на десткопі/таблеті/мобілці */}

        {isDesktop || isTablet ? (
          <div className="flex flex-col items-start gap-1 relative self-stretch w-full">
           <div className="flex items-center justify-between relative self-stretch w-full">
            <h3 className="">
              {product?.name}&nbsp;&quot;{product?.collectionName}&quot;
            </h3>

            <div className="flex items-center gap-4">
              <button type="button" className="btn" onClick={() => {}}>
                <ScalesIcon />
              </button>

              <button type="button" className="btn" onClick={() => setFavorites(product.id)}>
                {isFavorite ? (
                  <FavoriteFilledIcon classname="w-6 h-6" />
                ) : (
                  <FavoriteIcon/>
                )}
              </button>
            </div>
          </div>

          <div className="self-stretch font-medium text-grey">Артикул: {product.sku}</div>

          {product?.name === 'Ланцюжок' || product?.name === 'Каблучка' ? ( 
          <div className="flex flex-col items-start gap-4 w-full">
            <div className="flex items-center justify-between w-full">
              <div className="">Розмір</div>

              <div className="">
                <button
                  type="button"
                  className="btn min-w-[200px] text-grey flex items-center gap-3 hover:text-brown-dark transition-all duration-300"
                  onClick={() => {}}
                >
                  Як визначити розмір?
                  <InfoIcon classname="w-6 h-6" />
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full">
              {product.productSizes?.map((size) => (
                <button
                  key={size}
                  type="button"
                  className={cn(
                    'btn w-[46px] h-[29px] py-1 px-2 border-[0.5px] hover:text-accent transition-all duration-300',
                    active === size ? 'border-brown-dark' : 'border-transparent',
                  )}
                  onClick={handleActive.bind(null, size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        ) : null}
        </div>
        ) : null}

        <div className="flex flex-col items-start gap-5 relative self-stretch w-full">
          {isDesktop || isTablet ? (
            <div className="inline-flex h-8 items-center justify-center gap-3">
              {product.price.discountPercentage ? (
                <>
                  <h3 className="line-through text-grey">{product?.price.normalPrice}&nbsp;грн</h3>
                  <h3>{product.price.discountedPrice}&nbsp;грн</h3>
                </>
              ) : (
                <h3 className="">{product?.price.normalPrice}&nbsp;грн</h3>
              )}
            </div>
          ) : null}
         
          <div className="flex gap-2 md:gap-5 self-stretch w-full">
            <Button
              type="button"
              className="flex-1"
              asChild
              onClick={() => handleBuy({ product })}
            >
              <Link to={AppRoute.CHECKOUT}>Купити</Link>
            </Button>

            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => addToCart(product)}
            >
              Додати в кошик
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start gap-5 w-full">
        <Accordion
          type="multiple"
          className="w-full"
          defaultValue={['characteristics', 'delivery', 'returns']}
        >
          <AccordionItem value="characteristics" className="border-none">
            <AccordionTrigger className="py-3 px-0 hover:no-underline">
              <span className="font-medium text-brown-dark text-xl">Характеристики</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col w-full items-start border-t border-grey">
                <div className="flex items-center justify-between w-full py-1 border-b border-grey">
                  <div className="font-medium text-grey">Метал</div>
                  <div className="font-medium text-grey">
                    {product.description?.characteristic.metal}
                  </div>
                </div>

                <div className="flex items-center justify-between w-full py-1 border-b border-grey">
                  <div className="font-medium text-grey">Колір</div>
                  <div className="font-medium text-grey">
                    {product.description?.characteristic.color}
                  </div>
                </div>

                <div className="flex items-center justify-between w-full py-1 border-b border-grey">
                  <div className="font-medium text-grey">Середня вага</div>
                  <div className="font-medium text-grey">
                    ~&nbsp;{product.description?.characteristic.averageWeight}&nbsp;г
                  </div>
                </div>

                {product?.name !== 'Ланцюжок' && product?.name !== 'Каблучка' ? (
                  <div className="flex flex-col w-full py-1 border-b border-grey">
                    <div className="font-medium text-grey  mb-2">Розміри</div>

                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="font-medium text-grey">Ширина</span>
                      <span className="font-medium text-grey">
                        {product.description?.characteristic.size.width}&nbsp;мм
                      </span>
                    </div>

                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="font-medium text-grey">Висота</span>
                      <span className="font-medium text-grey">
                        {product.description?.characteristic.size.height}&nbsp;мм
                      </span>
                    </div>

                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium text-grey">Довжина</span>
                      <span className="font-medium text-grey">
                        {product.description?.characteristic.size.length}&nbsp;мм
                      </span>
                    </div>
                  </div>
                ) : null}

                <div className="flex items-center justify-between w-full py-1 border-b border-grey">
                  <div className="font-medium text-grey">Камінь</div>
                  <div className="font-medium text-grey">
                    {product.description?.characteristic.stone}
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="delivery" className="border-none">
            <AccordionTrigger className="py-3 px-0 hover:no-underline">
              <span className="font-medium text-brown-dark text-xl">Доставка та оплата</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="text-grey text-base">
                <span className="text-grey ">
                  Доставка у відділення і поштомат Нової Пошти та кур'єром Нової Пошти
                  незалежно від суми замовлення - безкоштовно.
                </span>

                <span className="font-medium text-grey block mt-5">Оплату можна здійснити:</span>
                  <ul className="text-grey list-disc px-5" >
                    <li> Готівкою при отриманні;</li>
                    <li> Післяплатою від Нової Пошти;</li>
                    <li>Картою Visa / MasterCard;</li>
                    <li>Скористатися сервісами LiqPay, Приват24, Monobank;</li>
                    <li>Оформити оплату частинами від Приват 24, Monobank;</li>
                    <li> Подарунковим сертифікатом ТМ "Jemma".</li>
                  </ul>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="returns" className="border-none">
            <AccordionTrigger className="py-3 px-0 hover:no-underline">
              <span className="font-medium text-brown-dark text-xl">Повернення</span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="font-medium text-grey text-base leading-[normal]">
                Просимо звернути увагу, що згідно з чинного законодавства України ювелірні виробу
                входять до переліку товарі, що НЕ підлягають поверненню та обміну : &quot;Ювелірні
                вироби належної якості, указані в переліку Непродовольчих товарів, затвердженим
                Постановою Кабінету міністрів України від 19 березня 1994 руку №172, не підлягають
                поверненню та обміну.&quot;
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
