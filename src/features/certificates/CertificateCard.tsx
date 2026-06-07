import { Link } from 'react-router-dom';
import cn from 'classnames';

import { AppRoute } from '@/enums';
import { ICertificateItem } from '@/types/certificate';
import { Card, CardContent, CardFooter } from '@/components/ui';
import { FavoriteIcon } from '@/assets';

export const CertificateCard = ({ item }: { item: ICertificateItem }) => {
  return (
      <Card className={cn('w-[259px] h-[282px] group rounded-none')}>
        <CardContent className={cn('relative w-full h-full overflow-hidden')}>
          <div className="w-full h-full relative bg-cover bg-center">
            <div className="absolute w-full h-auto  inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

            <img
              src={item.image}
              alt={item.name}
              className={cn(
                'absolute w-full h-full object-cover scale-100 group-hover:scale-107 transition-all duration-300',
              )}
            />

            <div className="absolute top-5 right-5 flex gap-2 z-20 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
              <button className="btn" onClick={() => {}}>
                {/* {isInFavorite ? (
                  <FavoriteFilledIcon classname="w-5 h-5" />
                ) : (
                  <FavoriteIcon classname="w-5 h-5 text-brown-dark" />
                )} */}
                <FavoriteIcon />
              </button>
            </div>

            <Link
              to={AppRoute.CERTIFICATE.replace(':id', item.id.toString()).replace(':title', item.price.toString())}
              className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <button className="btn-buy">Купити</button>
            </Link>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between">
          <span className=" mt-2">{item.price} грн</span>
        </CardFooter>
      </Card>
  );
};
