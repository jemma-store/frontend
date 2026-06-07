import { useEffect, useState, useCallback } from 'react';
import { useOrderStore } from '@/store/useOrderStore';
import { getReviewById } from '@/services/reviewServics';
import { IOrderItem } from '@/types/orderDetails';
import { ReviewModal } from '@/components/ReviewModal';
import { SuccessPostReviewModal } from '@/components/SuccessPostReviewModal'; 
import { AppRoute } from '@/enums/route';
import { NavLink, Outlet } from 'react-router-dom';

interface IReview {
  id: number;
  author: string;
  text: string;
  score: number;
  reviewDate: string;
  createdAt?: string; 
  images: string[];
}

export const UserReviews = () => {
 const { orders, fetchOrders } = useOrderStore();
  const [reviews, setReviews] = useState<Record<string, IReview>>({});
  const [isReviewsLoading, setIsReviewsLoading] = useState(false);
  
  // 1. Змінюємо стейт, щоб він очікував МАСИВ і за замовчуванням був порожнім масивом
  const [selectedItems, setSelectedItems] = useState<IOrderItem[]>([]);

  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const loadAllReviews = useCallback(async () => {

    setIsReviewsLoading(true);
    try {

      if (orders.length === 0) {
        await fetchOrders();
      }

      const currentOrders = useOrderStore.getState().orders;
      const allItems = currentOrders.flatMap(order => order.items);

      const results = await Promise.all(allItems.map(item => getReviewById(item.id)));
      console.log(results)

      const reviewsMap: Record<string, IReview> = {};
      
      allItems.forEach((item, index) => {
        const data = results[index];
        
        if (data && typeof data === 'object' && !Array.isArray(data) && Object.keys(data).length > 0) {
          reviewsMap[item.id] = data;
        } else if (Array.isArray(data) && data.length > 0) {
          reviewsMap[item.id] = data[data.length - 1];
        }
      });

      setReviews(reviewsMap);
    } catch (error) {
      console.error("Помилка завантаження відгуків:", error);
    } finally {
      setIsReviewsLoading(false);
    }
  }, [orders.length, fetchOrders]);

   const handleReviewSuccess = () => {
    setIsReviewModalOpen(false); 
    setIsSuccessModalOpen(true);  
  };

  useEffect(() => {
    loadAllReviews();
  }, [loadAllReviews]);

  // 2. Оновлюємо функцію
  const handleOpenModal = (item: IOrderItem) => {
    // Огортаємо переданий товар у масив за допомогою квадратних дужок!
    setSelectedItems([item]); 
    setIsReviewModalOpen(true); 
  };

  return (
    <div className="md:mt-[30px] md:pr-15 md:pl-30 mx-auto">
      <div className='flex gap-9 md:gap-30 mb-6 md:mb-16'>
        <NavLink className={({isActive}) => `ml-[42px] md:ml-0 md:px-13 pt-[26px] md:py-2.5 text-[20px] ${isActive ? "border-b-2 pb-2 border-[#5B242A]" : ""}`} to={AppRoute.USER_REVIEWS_PUBLISHED}>Мої відгуки</NavLink>
        <NavLink className={({isActive}) => `md:px-13 pt-[26px] md:py-2.5 text-[20px] ${isActive ? "border-b-2 border-[#5B242A]" : ""}`} to={AppRoute.USER_REVIEWS_PENDING}>Очікують на відгук</NavLink>
      </div>
      
      <div className='p-4 md:p-0'>
        {isReviewsLoading ? (
          <div className="flex justify-center items-center py-20 text-xl text-[#727272]">
            Завантаження відгуків... 🔄
          </div>
        ) : (
          <Outlet context={{ reviewsMap: reviews, handleOpenModal }} />
        )}
      </div>

      <ReviewModal 
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)} 
        // 3. Передаємо сюди наш новий стейт (який тепер точно є масивом)
        items={selectedItems}
        onSuccess={handleReviewSuccess}
      />

      {isSuccessModalOpen && (
        <SuccessPostReviewModal 
          isOpen={isSuccessModalOpen} 
          onClose={() => setIsSuccessModalOpen(false)} 
        />
      )}

    </div>
  );
}