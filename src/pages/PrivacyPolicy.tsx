import { BreadCrumbs } from '@/components/BreadCrumbs';
import { AppRoute } from '@/enums';
import { privacy } from '@/mock/privacyPolicy';

export const PrivacyPolicy = () => {
  return (
    <div className="mt-[100px]">
      <div className="container py-10">
        <BreadCrumbs
          items={[
            { label: 'Головна', href: AppRoute.ROOT },
            { label: 'Політика конфіденційності' },
          ]}
        />
      </div>

      <div className="container flex flex-col items-center pb-[var(--section-indent)]">
        <h3 className="mb-10 text-center">Політика конфіденційності інтернет-магазину JEMMA</h3>

        <div className="max-w-[874px]">
          <article className="w-full flex flex-col mb-8">
            <p className="mb-4 text-[var(--grey)]">Останнє оновлення: <span>13 травня 2025 року</span></p>

            <p className="mb-4">
              Ця Політика конфіденційності регулює порядок збору, використання, зберігання і
              розкриття персональних даних користувачів сайту [https://jemma-shop.com.ua] (далі –
              Сайт), що належить ТОВ «Джемма Рітейл» (далі – Продавець).
            </p>

            {privacy.list.map((item, index) => (
              <div key={index} className="mb-4">
                <h6>{item.title}</h6>
                {item.content.map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
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
