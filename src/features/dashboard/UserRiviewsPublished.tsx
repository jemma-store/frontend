import { useOutletContext } from 'react-router-dom';
import { useOrderStore } from '@/store/useOrderStore';
import { dateFormatter } from '@/utils/dateFormatter';
import { useWindowWidth } from '@/lib/hooks/useWindowWidth';

export const UserReviewsPublished = () => {
  const { reviewsMap } = useOutletContext<any>();
  const { orders } = useOrderStore();
  const allPurchasedItems = orders.flatMap(order => order.items);
  const publishedItems = allPurchasedItems.filter(item => reviewsMap[item.id]);
  const {isMobile} = useWindowWidth()

  return (
    <div>
      {publishedItems.length === 0 ? (
        <p className="text-gray-500">Ви поки не лишили жодного відгуку</p>
      ) : (
        <div className="flex flex-col gap-4 ">
          {publishedItems.map((item, index) => {
            const review = reviewsMap[item.id]; 

            return (
              <div key={`${item.id}-${index}`} className="md:border p-4 rounded-md bg-white">
                <div className='flex justify-between'>
                    <div className='flex gap-5'>
                        <img className='w-21 h-29 object-cover' src={item.product.images[0].url} alt="" />
                        <span>{item.product.name} "{item.product.collectionName}"</span>
                    </div>
                    {isMobile ? (
                        null
                    ) : (
                      <span className='text-[#727272]'>{dateFormatter(review.reviewDate)}</span>
                    )}
                    
                </div>
                
                <div>
                    <div className="flex gap-3 pt-5 md:py-5">
                        {[1, 2, 3, 4, 5].map((starNumber) => {
                            return (
                            <span 
                                key={starNumber} 
                                className="text-yellow-500 text-lg" 
                            >
                                {starNumber <= review.score ? "★" : "☆"}
                            </span>
                            );
                        })}
                    </div>
                  <p className="text-gray-700 mt-3 md:mt-2 md:mb-9">{review.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};