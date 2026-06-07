  import { Link } from 'react-router-dom';
  import { AppRoute } from '@/enums';
  import { useSmartCart } from '@/lib/hooks/useSmartCart';

  export const Summary = () => {
      
    const {cartItemsWithData} = useSmartCart()
    
    const conditions = [
      {
        title: 'Підтверджуючи замовлення, ви приймаєте умови:',
        content: [
          { text: '· Угоди користувача', link: AppRoute.USER_AGREEMENT },
          { text: '· Політику Конфіденційності', link: AppRoute.PRIVACY },
        ],
      },
    ];

    const giftWrapping = 240;
    const deliveryService = 0;

    const cartTotal = cartItemsWithData.reduce((sum, { product, quantity }) => {
      const price = product.price.discountedPrice ?? product.price.normalPrice;
      return sum + price * quantity;
    }, 0);

    const totalPayment = cartTotal + giftWrapping + deliveryService;

    return (
      <div className="flex flex-col w-full leading-[130%] md:p-5">

      <div className='grid grid-cols-2 justify-between items-center mt-8 md:hidden mb-4'>
        <span className='text-[20px] font-medium'>Промокод</span>
        <button 
          type='button'
          className='text-[16px] border-1 p-3 cursor-pointer hover:bg-button hover:text-white'
          >
            Додати
          </button>
      </div>

      <div className='w-full flex flex-col gap-8 md:gap-10' >
        <section className="flex items-start justify-between">
          <span>Послуги доставки</span>
          <span className="">{deliveryService}&nbsp;грн</span>
        </section>

        <section className="flex items-start justify-between">
          <span>Подарункове паковання</span>
          <span className="">{giftWrapping}&nbsp;грн</span>
        </section>

        <section className="flex justify-between items-center">
          <span className="font-medium text-second">До сплати</span>
          <span className="text-2xl text-button">{totalPayment}грн</span>
        </section>

        <div className="flex items-center w-full">
          <button 
          className="w-full btn-buy bg-button" 
          type="submit" 
          >
            Купити
          </button>
        </div>
      </div>

        <div className="flex w-full font-main font-light text-[12px] mt-8 md:mt-10">
          {conditions.map((item, index) => (
            <div key={index} className="flex flex-col items-start gap-2 w-full ">
              <p>{item.title}</p>

              {item.content.map((content, i) => (
                <Link key={i} to={content.link} className="underline md:pl-2">
                  {content.text}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };
