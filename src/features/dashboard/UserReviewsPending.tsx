import { useOutletContext } from 'react-router-dom';
import { useOrderStore } from '@/store/useOrderStore';

export const UserReviewsPending = () => {
  const { reviewsMap, handleOpenModal } = useOutletContext<any>();
  const { orders } = useOrderStore();
  const allPurchasedItems = orders.flatMap(order => order.items);
  const pendingItems = allPurchasedItems.filter(item => !reviewsMap[item.id]);

  return (
    <div>
      {pendingItems.length === 0 ? (
        <p className="text-gray-500">У вас немає товарів, які очікують на відгук.</p>
      ) : (
        <div className="flex flex-col">
          {pendingItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="py-2 md:py-4 items-center rounded-md w-full shadow-[-5px_10px_15px_-3px_rgba(0,0,0,0.1)]">
                <div className='flex md:justify-between px-2'>
                    <div>
                        <img src={item.product?.images?.[0]?.url} className='w-[84px] h-[116px] md:w-[260px] md:h-[276px] object-cover'></img> 
                    </div>
                    <div className='flex flex-col gap-y-13 md:gap-y-0 md:justify-between pl-4 md:pl-0'>
                        <span className='md:text-end text-[16px] leading-[130%]'>
                            {item.product.name} "{item.product.collectionName}"
                        </span>
                         <button 
                            onClick={() => handleOpenModal(item)}
                            className="text-[16px] py-2.5 px-16 md:px-14 bg-button text-white cursor-pointer hover:opacity-80"
                        >
                            Залишити відгук
                        </button>
                    </div>
                </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};