import { AppRoute } from '@/enums';
import { user } from '@/mock/userAgreement';
import { privacy } from '@/mock/privacyPolicy';
import { BreadCrumbs } from '@/components/BreadCrumbs';

export const UserAgreement = () => {
  return (
    <div className="mt-[100px]">
      <div className="container py-10">
        <BreadCrumbs
          items={[{ label: 'Головна', href: AppRoute.ROOT }, { label: 'Угода користувача' }]}
        />
      </div>

      <div className="container flex flex-col items-center pb-[var(--section-indent)]">
        <h3 className="mb-10 text-center">Угода користувача інтернет-магазину JEMMA</h3>

        <div className="max-w-[874px]">
          <article className="w-full flex flex-col mb-8">
            <p className="mb-4 text-[var(--grey)]">
              Останнє оновлення: <span>13 травня 2025 року</span>
            </p>

            <p className="mb-4">
              Перед використанням сайту [https://jewelry-store-sigma.vercel.app/] (далі – Сайт), що
              належить ТОВ «Джемма Рітейл» (далі – Власник), прочитайте цю Угоду користувача. Якщо
              ви не згодні з даною Угодою користувача, не використовуйте цей сайт.
            </p>

            {user.list.map((item, index) => (
              <div key={index} className="mb-4">
                <h6>{item.title}</h6>
                {item.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className='mb-4'>{paragraph}</p>
                ))}
              </div>
            ))}
          </article>

          <footer className="w-full">
            <h6>Контакти адміністратора даних:</h6>
            {privacy.seller.map((detail, index) => (
              <p key={index}>{detail}</p>
            ))}
          </footer>
        </div>
      </div>
    </div>
  );
};
