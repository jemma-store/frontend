import { Link } from 'react-router-dom';
import { AppRoute } from '@/enums';
import { ICertificateItem } from '../types/';
import { Card, CardContent, CardFooter } from './ui';
import { FavoriteFilledIcon, FavoriteIcon} from '@/assets';
import { useCertificateStore } from '@/store';

interface CertificateCardProps {
  certificate: ICertificateItem;
  isHidden?: boolean;
}

export const CertificateCard = ({ certificate, isHidden }: CertificateCardProps) => {
  const setFavorites = useCertificateStore((state) => state.setFavorites);
  const favorites = useCertificateStore((state) => state.favorites);

  const isFavorite = favorites.includes(certificate.id);

  return (
    <Card
      className='group relative border-0 overflow-hidden flex flex-col object-cover justify-between transition-all w-full h-[230px] md:h-[242px] lg:h-[340px]'
    >
      <CardContent
        className='flex flex-col items-center justify-end gap-2.5 relative flex-1 shrink-0 mb-1 overflow-hidden border-0 w-full bg-cover bg-center'
      >
        <div className="absolute inset-0 bg-black/20 opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 z-2" />

        <img
          className="absolute w-full h-full object-cover scale-100 lg:group-hover:scale-107 transition-all duration-300"
          src={certificate.image}
          alt={certificate.name}
        />

        <div className="absolute w-full top-2 lg:top-5 left-0 flex items-center justify-between lg:justify-end gap-5 px-2 lg:px-5 z-5 lg:opacity-0 lg:group-hover:opacity-100 translate-y-2 lg:group-hover:translate-y-0 transition-all duration-300">
          <button className="btn w-6 h-6" onClick={() => setFavorites(certificate.id)}>
            {isFavorite ? (
              <FavoriteFilledIcon classname="w-6 h-6" />
            ) : (
              <FavoriteIcon/>
            )}
          </button>

           {/* <button className="btn w-6 h-6" onClick={handleCartClick}>
                      {isInCart(product.id) ? (
                        <ShoppingBagFilledIcon classname="w-6 h-6" />
                      ) : (
                        <ShoppingBagIcon classname="w-6 h-6" />
                      )}
            </button> */}
        </div>

        
        
        <Link
          to={AppRoute.CERTIFICATE.replace(':id', certificate.id.toString())
            .replace(':title', certificate.name)}
          className="absolute bottom-2 lg:bottom-3 z-5 lg:opacity-100 xl:opacity-0 xl:group-hover:opacity-100 transition-all duration-300"
        >
          <button className="btn-buy bg-white text-black">Купити</button>
        </Link>
      </CardContent>

      {isHidden ? null : (
        <CardFooter className="flex font-medium text-brown-dark justify-end md:justify-between md:items-start">
    <span className='hidden md:block md:w-1/2'>{certificate.name}</span>
    <span className="text-end md:w-1/3">{certificate.price} грн</span>
</CardFooter>
      )}
    </Card>
  );
};
