// import { FC } from 'react';
// import { Link } from 'react-router-dom';

// import { AppRoute } from '@/enums';
// import { ICertificateItem } from '@/types/';
// import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Button } from '@/components/ui';
// import { FavoriteIcon } from '@/assets';

// interface IInfoProps {
//   certificate: ICertificateItem;
// }

// export const Info: FC<IInfoProps> = ({ certificate }) => {
//   return (
//     <div className="flex flex-col w-full items-start gap-8">
//       <div className="flex-col items-end gap-7 flex relative self-stretch w-full">
//         <div className="flex flex-col items-start gap-1 relative self-stretch w-full">
//           <div className="flex items-center justify-between relative self-stretch w-full">
//             <h3 className="">Подарунковий сертифікат</h3>

//             <div className="flex items-center gap-4">

//               <button type="button" className="btn" onClick={() => {}}>
//                 <FavoriteIcon classname="text-brown-dark" />
//               </button>
//             </div>
//           </div>

//           <div className="self-stretch font-medium text-grey text-base leading-[20.8px]">
//             Артикул: {certificate.sku}
//           </div>
//         </div>

//         <div className="flex flex-col items-start gap-5 relative self-stretch w-full">
//           <div className="inline-flex h-8 items-center justify-center">
//             <h3 className="">{certificate.name}</h3>
//           </div>

//           <div className="flex items-center justify-between gap-5 relative self-stretch w-full">
//             <Link to={AppRoute.CHECKOUT} className="">
//               <button className="btn-buy w-[259px]">Купити</button>
//             </Link>

//             <Button type="button" variant='outline' className="w-[259px]" onClick={() => {}}>
//               Додати в кошик
//             </Button>
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col items-start gap-5 w-full">
//         <Accordion
//           type="multiple"
//           className="w-full"
//           defaultValue={['characteristics', 'delivery', 'returns']}
//         >
//           <AccordionItem value="characteristics" className="border-none">
//             <AccordionTrigger className="py-3 px-0 hover:no-underline">
//               <span className="font-medium text-brown-dark text-xl">Опис</span>
//             </AccordionTrigger>
//             <AccordionContent>
//               <div className="flex flex-col w-full items-start gap-1">
//                 <span className="text-grey">{certificate.description}</span>
//               </div>
//             </AccordionContent>
//           </AccordionItem>

//           <AccordionItem value="delivery" className="border-none">
//             <AccordionTrigger className="py-3 px-0 hover:no-underline">
//               <span className="font-medium text-brown-dark text-xl">Доставка та оплата</span>
//             </AccordionTrigger>
//             <AccordionContent>
//               <div className="text-grey text-base">
//                 <span className="text-grey">
//                   Доставка у відділення і поштомат Нової Пошти та кур&apos;єром Нової Пошти
//                   незалежно від суми замовлення - безкоштовно.{' '}
//                 </span>

//                 <span className="font-medium text-grey block my-2">Оплату можна здійснити:</span>

//                 <span className="text-grey">
//                   Готівкою при отриманні; <br />
//                   Післяплатою від Нової Пошти; <br />
//                   Картою Visa / MasterCard; <br />
//                   Скористатися сервісами LiqPay, Приват24, Monobank; <br />
//                   Оформити оплату частинами від Приват 24, Monobank; <br />
//                   Подарунковим сертифікатом ТМ &#34;Jemma&#34;.
//                 </span>
//               </div>
//             </AccordionContent>
//           </AccordionItem>
//         </Accordion>
//       </div>
//     </div>
//   );
// };
