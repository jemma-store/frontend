import { Card, CardContent } from '@/components/ui';
import { useProductStore } from '@/store';

export const AlsoBuy = ({ id }: { id: number }) => {
  const collectionProducts = useProductStore(state => state.collectionProducts);
  const products = collectionProducts.filter(product => product.id !== id);

  return (
    <section className="flex flex-col items-start gap-10 w-full section-indent mt-15">
      <h2 className="w-full font-third font-normal text-brown-dark text-2xl leading-[31.2px] tracking-[0]">
        Разом із цим товаром також купують
      </h2>

      <div className="flex items-center gap-5 w-full">
        {products.map((product) => {
          const firstImage = product.images?.[0];

          return (
            <Card key={product.id} className="w-[276px] border-none shadow-none">
              <div className="relative w-full h-[244px] md:h-[195px] xl:w-[276px] bg-grey">
                <img
                  className="absolute w-full h-full top-0 left-0 object-cover"
                  alt={`${product.name}`}
                  src={firstImage?.url || "/placeholder-image.jpg"}
                />
              </div>

              <CardContent className="p-0 pt-2">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-1">
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-brown-dark whitespace-nowrap">
                        {product.name}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-grey whitespace-nowrap">
                        &quot;{product.collectionName}&quot;
                      </span>
                    </div>
                  </div>
                  <span className="text-brown-dark whitespace-nowrap">
                    {product.price.normalPrice}&nbsp;грн
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};
