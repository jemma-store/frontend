import { useEffect, useState } from "react";
import { useOrderStore } from "@/store";
import { useWindowWidth } from "@/lib/hooks/useWindowWidth";
import { ReviewModal } from "@/components/ReviewModal";
import { IOrderItem } from "@/types/orderDetails";

export const UserOrders = () => {

  const { orders, fetchOrders } = useOrderStore() 

  const {isMobile} = useWindowWidth()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentOrderItems, setCurrentOrderItems] = useState<IOrderItem[]>([]);

   const handleOpenReview = (items: IOrderItem[]) => {
    setCurrentOrderItems(items); 
    setIsModalOpen(true);   
  };

  const dateChanger = (date :string) => {
    const dataObj = new Date(date).toLocaleDateString('uk-UA', {
      day : "numeric",
      month : "long",
      year : "numeric"
    })
    return dataObj.replace(/\s*р\.?$/, "");
  }
  
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders])

  const orderStatusMap: Record<string, string> = {
  PENDING: 'В очікуванні',
  DONE: 'Виконано',
  CANCELLED: 'Скасовано',
  SHIPPED: 'Відправлено',
  };

  const getStatusLabel = (status: string) => {
  return orderStatusMap[status] || status;
  };

  console.log("Дані замовлень у сторі:", orders);


  return (
    <div className="lg:mt-25 ">
    {isMobile && (
      <h2 className="text-button text-[20px] text-center p-8">Історія Замовлень</h2>
    )}
      
      {orders.length < 1 ? (
        <span className="container flex text-[16px] font-normal md:text-left md:justify-start mt:align-left md:pt-28 md:pl-20 lg:pt-3">
          Ви поки не здійснили жодного замовлення
        </span>
      ) : (
        orders.map(item => (
          <div key={item.id} className="container md:pl-0 md:pt-10">
          <div className="flex justify-between items-baseline pb-3 md:pb-12 lg:pb-7">
            <span className="text-[20px] font-normal md:font-medium">
              Замовлення № {item.orderNumber?.slice(-4)}
            </span>
            <span className="text-[16px] text-[#727272]">
              {dateChanger(item.createdAt)}
            </span>
          </div>
          
          <span className="text-[16px] text-button">
            {getStatusLabel(item.status)}
          </span>

        <div className="grid grid-cols-2 gap-4 mt-4 lg:mt-14 lg:min-w-100 lg:max-w-225 xl:grid-cols-3 xl:max-w-250">
          {item.items.map((orderItems) => (
            <div key={orderItems.id}>
              <img 
              src={orderItems.product.images[0].url} 
              alt={`Замовлений товар : ${orderItems.product.categoryName}`}
              className="w-full object-cover"
              />
              <div className="flex gap-1 py-1 md:justify-between lg:py-2">
                <div className="flex gap-1">
                  <span>{orderItems.product.name}</span>
                  <span>"{orderItems.product.collectionName}"</span>
                </div>
                {!isMobile ? (
                  <span className="text-button text-[16px]">
                    {orderItems.product.price.normalPrice} грн
                  </span>
                ): (
                  null
                )}
              </div>
            {isMobile? (
              <span className="text-button text-[16px]">
                {orderItems.product.price.normalPrice} грн
              </span>
            ) : (
              null
            )}
          </div>
          ))}
        </div>
          <div className=" flex flex-col gap-4 pt-5 pb-8 md:pb-16 lg:pb-5 lg:gap-5">
              {item.isGift && (  
                <div className="flex justify-between">
                  <span>Подарункове пакування</span>
                  <span className="text-button">{"240 грн"}</span>
                </div>
              )}

            <div className="flex justify-between">
              <span>Послуги доставки </span>
              <span className="text-button">0 грн</span>
            </div>

            <div className="flex justify-between text-[16px] font-medium md:text-[20px] ">
              <span>Разом </span>
              <span className="text-button">{item.isGift ? item.totalPrice + 240 + " грн" : item.totalPrice + ' грн'}</span>
            </div>
          </div >
          <div className="flex justify-end">
          <button 
            className="flex justify-center w-full border-1 p-3 text-[16px] mb-15
            hover:bg-button hover:text-white cursor-pointer
            md:mb-0 md:w-1/2 md:mx-auto lg:mx-0 lg:block lg:w-4/10 lg:justify-end"
            onClick={() => handleOpenReview(item.items)}
            >
            Залишити відгук
          </button>
          </div>
        </div>
        ))
      )}

     <ReviewModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        items={currentOrderItems} 
    />
    </div>
  )
};