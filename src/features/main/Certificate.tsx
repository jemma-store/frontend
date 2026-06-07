import { Link } from 'react-router-dom';

import { AppRoute } from '@/enums';

export const Certificate = () => {
  return (
    <section
      id="certificate"
      className="relative w-full lg:h-[1000px] min-h-[323px] bg-cover bg-center"
      style={{ backgroundImage: `url('/images/certif.jpg')` }}
    >
      <div className="flex flex-col h-full items-center justify-between gap-16 lg:py-[100px] py-4">
        <h2 className="text-center text-main">Подарункові сертифікати</h2>

        <Link to={AppRoute.CERTIFICATES} className="inline-block lg:static absolute bottom-4 left-50%">
          <button className="btn-buy">Купити</button>
        </Link>
      </div>
    </section>
  );
};
