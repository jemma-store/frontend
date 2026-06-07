import { SaleLarge, SaleMoon, SaleRing } from '@/assets';

export const productsSale = [
  {
    id: 1,
    name: 'Підвіска',
    description: '"Moon"',
    originalPrice: '3 699 грн',
    discountedPrice: '2 026 грн',
    imageClass: 'lg:w-[315px] w-[177px] lg:h-[400px] h-[244px] bg-[100%_100%]',
    image: SaleMoon,
    position: 'top-32 left-[60px]',
    width: 'w-[315px]',
  },
  {
    id: 2,
    name: 'Каблучка',
    description: '"Moon"',
    originalPrice: '6 799 грн',
    discountedPrice: '5 959 грн',
    imageClass: 'lg:w-[315px] w-[177px] lg:h-[400px] h-[244px] bg-cover bg-[100%_100%]',
    image: SaleRing,
    position: 'top-32 left-[395px]',
    width: 'w-[315px]',
  },
  {
    id: 3,
    name: 'Сережки',
    description: '"Moon"',
    originalPrice: '9 799 грн',
    discountedPrice: '8 559 грн',
    imageClass: 'max-w-[650px] lg:h-[760px] h-[370px] bg-cover bg-[100%_100%]',
    image: SaleLarge,
    position: 'top-32 left-[746px]',
    width: 'w-[650px]',
  },
];
