import { useParams } from 'react-router-dom';

import { AppRoute } from '@/enums';
import { BreadCrumbs } from '@/components/BreadCrumbs';
import { useCertificateStore } from '@/store/useCertificateStore';
import { Link } from 'react-router-dom';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger} from '@/components/ui';
import { SimilarCertificates } from '@/features/certificate/SimilarCertificates';
import { FavoriteIcon } from '@/assets';
import { useWindowWidth } from '@/lib/hooks/useWindowWidth';


export const SingleCertificate = () => {
  const {isTablet, isDesktop} = useWindowWidth();
  const { id } = useParams();
  const getCertificateById = useCertificateStore((state) => state.getCertificateById);
  const certificate = getCertificateById(Number(id));

  return (
    <div className="container mt-[100px]">
      <div className="mb-5 md:mt-32">
        <BreadCrumbs
          items={[
            { label: 'Головна', href: AppRoute.ROOT },
            { label: 'Подарункові сертифікати', href: AppRoute.CERTIFICATES },
            { label: `Сертифікат ${certificate?.price} грн` },
          ]}
        />
      </div>
    {isTablet || isDesktop ? (
      <>
   
      <div className='grid grid-cols-2 gap-4 mt-10'>
         <div className="flex flex-col w-full shrink-0">
            <img className="h-[392px] w-full xl:h-[690px]" alt={certificate?.name} src={certificate?.image} />
          </div>
          <div>
            <div className='flex justify-between items-start'>
              <h3 className="text-[24px]">Подарунковий <br/> сертифікат</h3>
              <div className="flex items-center gap-4">
                <button type="button" className="btn" onClick={() => {}}>
                  <FavoriteIcon/>
                </button>
             </div>
            </div>
            <div className="self-stretch font-medium text-grey mb-5 mt-2">
              Артикул: {certificate?.sku}
            </div>
             <h2 className='mt-5 mb-5 text-[24px] text-[#5B242A]'>{certificate?.price} грн</h2>

          <div className='grid grid-cols-2 gap-2 mb-5 md:gap-10'>
            <Link to={AppRoute.CHECKOUT} className="">
              <button className="btn-buy w-full text-[16px] font-medium">Купити</button>
            </Link>

             <Link to={AppRoute.CHECKOUT} className=""> {/*  тут потрбіно буде зробити ф-цію додати в корзину */}
              <button className="text-[16px] flex border-1 w-full h-full justify-center items-center font-medium">Додати в кошик</button>
            </Link>
          </div>

          <div className="flex flex-col items-start gap-5 w-full">
          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={['characteristics', 'delivery', 'returns']}
          >
            <AccordionItem value="characteristics" className="border-none">
              <AccordionTrigger className="mb-3 px-0 hover:no-underline justify-between">
                <span className="font-medium text-brown-dark text-xl">Опис</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col w-full items-start gap-1">
                  <span className="text-grey">{certificate?.description1}</span>
                  <span className="text-grey mt-5 mb-5">{certificate?.description2}</span>
                  <ul className="list-disc text-grey space-y-2 pl-5">
                    <li>{certificate?.description3.chapter1}</li>
                    <li>{certificate?.description3.chapter2}</li>
                    <li>{certificate?.description3.chapter3}</li>
                    <li>{certificate?.description3.chapter4}</li>
                    <li>{certificate?.description3.chapter5}</li>
                    <li>{certificate?.description3.chapter6}</li>
                    <li>{certificate?.description3.chapter7}</li>
                    <li>{certificate?.description3.chapter8}</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="delivery" className="border-none ">
              <AccordionTrigger className="mb-3 px-0 hover:no-underline justify-between">
                <span className="font-medium text-brown-dark text-xl">Доставка та оплата</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="text-grey text-base">
                  <span className="text-grey">
                    Доставка у відділення і поштомат Нової Пошти та кур'єром Нової Пошти
                    незалежно від суми замовлення - безкоштовно.
                  </span>

                  <span className="text-grey block mt-5 mb-2">Оплату можна здійснити:</span>
                  <span className="text-grey">
                    <ul className='list-disc text-grey space-y-1 pl-5'>
                      <li> Готівкою при отриманні;</li>
                      <li>Післяплатою від Нової Пошти;</li>
                      <li> Картою Visa / MasterCard;</li>
                      <li>Скористатися сервісами LiqPay, Приват24, Monobank;</li>
                      <li>Оформити оплату частинами від Приват 24, Monobank;</li>
                      <li>Подарунковим сертифікатом ТМ "Jemma"</li>
                      </ul>
                  </span>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div> 
    </div>
    
    <SimilarCertificates id={Number(id)} />

      </>
    ) : (
      <div className="grid grid-cols-1">
       <div className="flex items-center justify-between relative self-stretch w-full">
         <h3 className="text-[24px]">Подарунковий <br/> сертифікат</h3>
          
        </div>
          <div className="self-stretch font-medium text-grey mb-5 mt-2">
            Артикул: {certificate?.sku}
          </div>

          <div className="flex flex-col w-full shrink-0">
            <img className="h-[392px] w-full xl:h-[690px]" alt={certificate?.name} src={certificate?.image} />
          </div>

        <h2 className='text-center mt-5 mb-5 text-[24px] text-[#5B242A]'>{certificate?.price} грн</h2>
          <div className='grid grid-cols-2 gap-2 mb-5'>
            <Link to={AppRoute.CHECKOUT} className="">
              <button className="btn-buy w-full text-[16px] font-medium">Купити</button>
            </Link>

             <Link to={AppRoute.CHECKOUT} className=""> {/*  тут потрбіно буде зробити ф-цію додати в корзину */}
              <button className="text-[16px] flex border-1 w-full h-full justify-center items-center font-medium">Додати в кошик</button>
            </Link>
          </div>

        <div className="flex flex-col items-start gap-5 w-full">
          <Accordion
            type="multiple"
            className="w-full"
            defaultValue={['characteristics', 'delivery', 'returns']}
          >
            <AccordionItem value="characteristics" className="border-none">
              <AccordionTrigger className="mb-3 px-0 hover:no-underline justify-between">
                <span className="font-medium text-brown-dark text-xl">Опис</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col w-full items-start gap-1">
                  <span className="text-grey">{certificate?.description1}</span>
                  <span className="text-grey mt-5 mb-5">{certificate?.description2}</span>
                  <ul className="list-disc text-grey space-y-2 pl-5">
                    <li>{certificate?.description3.chapter1}</li>
                    <li>{certificate?.description3.chapter2}</li>
                    <li>{certificate?.description3.chapter3}</li>
                    <li>{certificate?.description3.chapter4}</li>
                    <li>{certificate?.description3.chapter5}</li>
                    <li>{certificate?.description3.chapter6}</li>
                    <li>{certificate?.description3.chapter7}</li>
                    <li>{certificate?.description3.chapter8}</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="delivery" className="border-none ">
              <AccordionTrigger className="mb-3 px-0 hover:no-underline justify-between">
                <span className="font-medium text-brown-dark text-xl">Доставка та оплата</span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="text-grey text-base">
                  <span className="text-grey">
                    Доставка у відділення і поштомат Нової Пошти та кур'єром Нової Пошти
                    незалежно від суми замовлення - безкоштовно.
                  </span>

                  <span className="text-grey block mt-5 mb-2">Оплату можна здійснити:</span>
                  <span className="text-grey">
                    <ul className='list-disc text-grey space-y-1 pl-5'>
                      <li> Готівкою при отриманні;</li>
                      <li>Післяплатою від Нової Пошти;</li>
                      <li> Картою Visa / MasterCard;</li>
                      <li>Скористатися сервісами LiqPay, Приват24, Monobank;</li>
                      <li>Оформити оплату частинами від Приват 24, Monobank;</li>
                      <li>Подарунковим сертифікатом ТМ "Jemma"</li>
                      </ul>
                  </span>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <SimilarCertificates id={Number(id)} />
      </div>
 )}
      
    </div>
  );
};
