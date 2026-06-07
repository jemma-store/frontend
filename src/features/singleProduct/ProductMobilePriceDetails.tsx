import { FC, useState } from 'react';
import type { IProductItem } from '@/types/product';
import { cn } from '@/lib/utils';
import { InfoIcon,  } from '@/assets';


interface MobileProductSwiperProps {
    product: IProductItem;
}

export const ProductMobilePriceDetails:FC<MobileProductSwiperProps> = ({product}) => {

     const [active, setActive] = useState(product.productSizes?.[0] ?? null);
     const handleActive = (size: number) => setActive(size);

    return (
        <>
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
              {product?.name === 'Ланцюжок' || product?.name === 'Каблучка' ? ( 
                <div className="flex flex-col items-start gap-4 w-full">
                  <div className="flex items-center justify-between w-full">
                    <div className="">Оберіть Розмір</div>
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
        </>
    )
}