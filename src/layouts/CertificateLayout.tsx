import { FC, useState } from 'react';

import { AppRoute } from '@/enums';
import { ICertificateItem } from '../types/';
import { BreadCrumbs } from '@/components/BreadCrumbs';
import { Banner } from '@/features/certificates/Banner';
import { Filters } from '@/features/certificates/Filters';
import { Catalog } from '@/features/certificates/Catalog';
import { Sort } from '@/features/certificates/Sort';
import { useWindowWidth } from '@/lib/hooks/useWindowWidth';

interface CertificateLayoutProps {
  certificates: ICertificateItem[];
}

export const CertificateLayout: FC<CertificateLayoutProps> = ({ certificates }) => {

  const {isDesktop} = useWindowWidth();

  const [sort, setSort] = useState('popular');

  const filtered = certificates.filter((certificate) => certificate.name.toLowerCase());

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case 'priceLow':
        return a.price - b.price;
      case 'priceHigh':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <>
      <Banner />

      <div className="container mt-5 hidden md:block xl:block ">
        <BreadCrumbs
          items={[{ label: 'Головна', href: AppRoute.ROOT }, { label: 'Подарункові сертифікати' }]}
        />
      </div>

      {isDesktop? (
        <div className='container grid grid-cols-[0.2fr_1fr] gap-5 mt-5'>
          <div>
            <Filters/>
          </div>
          <div>
            <Sort setSort={setSort} sort={sort} />
            {sorted.length > 0 ? <Catalog data={sorted} /> : <div>Certificates not found</div>}
          </div>
        
        </div>
          ) : (<div className='container grid grid-cols-1'>
            <div className='flex w-full mt-7 mb-7 gap-3'>
              <div className='w-1/2 md:w-1/3'>
                  <Filters/>
              </div>
              <div className='w-1/2 md:w-1/3'>
                  <Sort setSort={setSort} sort={sort} />
              </div>
            </div>
            {sorted.length > 0 ? <Catalog data={sorted} /> : <div>Certificates not found</div>}
          </div>)}
          
          </>
        );
      };
