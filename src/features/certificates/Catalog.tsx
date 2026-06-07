import { FC } from 'react';

import { ICertificateItem } from '@/types/';
import { CertificateCard } from '@/components/CertificateCard';

interface ICatalogProps {
  data: ICertificateItem[];
}

export const Catalog: FC<ICatalogProps> = ({ data }) => {

  return (
    // <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 mb-10">
  <>
    <div className='grid grid-cols-2 gap-3 mb-10 md:grid md:grid-cols-4 md:gap-4'>
      {data.map((item) => (
        <article key={item.id} className='w-full h-full'>
          <CertificateCard certificate={item}/>
        </article>
      ))}
    </div>
  </>
   
  );
};
