import { useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';

import cn from 'classnames';
import { DeleteIcon } from '@/assets';
import { getAllProducts } from '@/services';
import { useProductStore } from '@/store';
import { Card, CardContent, CardFooter } from '@/components/ui';
import { AppRoute } from '@/enums';
import { IProductItem } from '@/types/product';

export const UserFavorites = () => {
  const favorites = useProductStore((state) => state.favorites);
  const setFavorites = useProductStore((state) => state.setFavorites);
  const allProducts = useProductStore((state) => state.allProducts)
  const getProductById = useProductStore((state) => state.getProductById);
  const setAllProducts = useProductStore((state) => state.setAllProducts);


 const products = useMemo(() => {
   return favorites
     .map((id) => getProductById(id))
     .filter((product): product is IProductItem => Boolean(product));
 }, [favorites, allProducts.content, getProductById]);

 useEffect(() => {
  const fetchProducts = async () => {
    if (allProducts.content.length === 0) {
      try {
        const res = await getAllProducts({ 
          page: 0, 
          size: 100 
        });
        
        setAllProducts(res); 
        
      } catch (err) {
        console.error("Помилка при завантаженні товарів:", err);
      }
    }
  };

  fetchProducts();
}, [allProducts.content.length, setAllProducts]);

  return (
    <div className="flex flex-col gap-12 md:gap-8 w-full h-auto leading-[130%]">
      <h4 className="mt-8 text-[20px] text-[#5B242A] text-center md:mt-10 md:text-left md:text-black font-normal lg:pt-25">Список бажань</h4>

      <div className="grid grid-cols-2 px-3 gap-2 pb-12 md:px-0 md:pr-20 md:gap-10 lg:grid-cols-3 ">
        {products.length > 0 ? (
          products.map((product) => (
            <Card key={product.id} className="relative">
              <CardContent className={cn('relative w-full overflow-hidden')}>
                <div className="w-full h-full relative bg-cover bg-center">
                  <div className="absolute w-full h-auto  inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pyx" />

                  {product.images
                    .map((image, index) => (
                      <div 
                      key={index} 
                      className='w-full  overflow-hidden'>
                        <img
                          src={image.url}
                          alt={product.name}
                          className={cn(
                            'object-cover h-full w-full',
                          )}
                        />
                      </div>
                    ))
                    .slice(0, 1)}
                
                  <div className='absolute bottom-2 left-0 right-0 flex justify-center z-20'>
                    <Link to={`${AppRoute.PRODUCTS}/${product.id}/${product.categoryName}/${product.collectionName}/${product.name}`}>
                      <button
                        className="btn-buy"
                        type='button'
                      >
                        Купити
                      </button>
                    </Link>
                  </div>

                    
                  <div className="absolute top-5 right-5 flex gap-2 z-20 ">
                    <button className="btn" onClick={() => setFavorites(product.id)}>
                      <DeleteIcon classname="w-5 h-5 text-grey" />
                    </button>
                  </div>        
                </div>
              </CardContent>

              <CardFooter className="flex items-center justify-between pt-1 pb-2 text-md">
                <div className="flex items-center gap-1">
                  <span className="font-medium">{product.categoryName}</span>

                  <span className="text-md text-gray-500">"{product.collectionName}"</span>
                </div>

                <span className="font-semibold ">{product.price.discountedPrice ?? product.price.normalPrice} грн</span>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div>У вас немає улюблених товарів</div>
        )}
      </div>
    </div>
  );
};
