import { offer } from '@/mock';
import { AppRoute } from '@/enums';
import { BreadCrumbs } from '@/components/BreadCrumbs';

export const PublicAgreement = () => {
  return (
    <div className="mt-[100px]">
      <div className="container py-10">
        <BreadCrumbs
          items={[{ label: 'Головна', href: AppRoute.ROOT }, { label: 'Публічна згода' }]}
        />
      </div>

      <div className="container flex flex-col items-center pb-[var(--section-indent)]">
        <h3 className="mb-10 text-center">
          <span className="uppercase">ПУБЛІЧНИЙ ДОГОВІР (ОФЕРТА)</span>
          <br />
          на купівлю-продаж товарів через інтернет-магазин <span className="uppercase">JEMMA</span>
        </h3>

        <div className="max-w-[874px]">
          <article className="w-full flex flex-col mb-8">
            <p className="mb-4">
              Цей документ є офіційною публічною офертою (пропозицією) ТОВ «Джемма Рітейл» (далі –
              «Продавець») і містить усі істотні умови договору купівлі-продажу товарів через
              інтернет-магазин, розміщений за адресою: 01001, м. Київ, вул. Лютеранська, буд. 12,
              оф. 5
            </p>

            {offer.contractSections.map((section, index) => (
              <div key={index} className="mb-4">
                <h6>{section.title}</h6>
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </div>
            ))}
          </article>

          <footer className="w-full">
            <h6>Реквізити Продавця:</h6>
            {offer.seller.map((detail, index) => (
              <p key={index}>{detail}</p>
            ))}
          </footer>
        </div>
      </div>
    </div>
  );
};