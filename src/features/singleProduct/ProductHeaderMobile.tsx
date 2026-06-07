import { IProductItem } from '@/types/';
import { useProductStore } from '@/store';
import { FavoriteFilledIcon, FavoriteIcon, ScalesIcon } from '@/assets';

export const ProductHeaderMobile = ({ product }: { product: IProductItem }) => { 

  const setFavorites = useProductStore((state) => state.setFavorites);
  const isFavorite = useProductStore((state) => state.favorites.includes(product.id))

  const setScales = useProductStore((state) => state.setScale)  
  const isScale = useProductStore((state) => state.scales.includes(product.id));

return (
    <>
     <div className="flex items-center justify-between relative self-stretch w-full">
        <h3 className="">
            {product?.name}&nbsp;&quot;{product?.collectionName}&quot;
        </h3>
            <div className="flex items-center gap-4">
             
                <button 
                  type="button" 
                  className="btn" 
                  onClick={() => setScales(product.id)}>
                    {isScale ? (
                      <div className='text-[#5B242A]'><ScalesIcon /></div>
                    ):(
                      <ScalesIcon />
                    )}
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

     <div className="self-stretch font-medium text-grey">
        Артикул: {product.sku}
     </div>

    </>
    )
}