import { useParams, useNavigate } from 'react-router-dom';
import { useState , useRef, useEffect} from "react";
import { getOrderById } from '@/admin-panel/services/getOrderById';
import { IFullOrderDetails } from '@/types/orderDetails';
import { formatDate, formatPrice } from '@/admin-panel/utils/data&priceTranslator';
import CalendarIcon from '@/admin-panel/icons/CalendarIcon';
import { OrderStatus } from '@/admin-panel/features/orders/components/OrderStatus';
import { OrderStatusType } from "@/admin-panel/constants/statusConfig";
import { Icons } from '@/admin-panel/icons';
import { STATUS_CONFIG } from '@/admin-panel/constants/statusConfig';
import { AppRoute } from '@/enums';
import { OrderCard } from '@/admin-panel/components/OrderCard';
import { FILTER_BY_DELIVERY_METHOD, FILTER_BY_PAYMENT_METHOD } from '@/admin-panel/constants/filterByDate';
import { MasterCard } from '@/assets';


export const OrderInfo = () => {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<IFullOrderDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [orderStatus, setOrderStatus] = useState<OrderStatusType | null>(null);
    const [isActive, setIsActive] = useState(false);
    const navigate = useNavigate();
    
    useEffect(() => {
    const fetchOrder = async () => {
        try {
            setIsLoading(true);
            if (!id) return;
            const data = await getOrderById(id);
            setOrder(data);
            setOrderStatus(data.status as OrderStatusType);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }
    if (id) fetchOrder();
    }, [id]);

    const totalItemsCount = order?.items.length;

    const deliveryLabel = FILTER_BY_DELIVERY_METHOD.find(
        (item) => item.value === order?.orderDetails.deliveryMethod
        )?.label || order?.orderDetails.deliveryMethod;

    const paymentLabel = FILTER_BY_PAYMENT_METHOD.find(
        (item) => item.value === order?.orderDetails.paymentMethod
        )?.label || order?.orderDetails.paymentMethod;

    const fullName = `${order?.orderDetails.lastName} ${order?.orderDetails.firstName} ${order?.orderDetails.fatherName}`
    const firstLastName = `${order?.orderDetails.firstName} ${order?.orderDetails.lastName}`

    const handleUpdateOrderStatus = (newStatus : OrderStatusType) => {
        setOrderStatus(newStatus)
        setIsActive(false)
    }

    const handleRowClick = (event: React.MouseEvent) => {
        if (menuRef.current && menuRef.current.contains(event.target as Node)) {
        return;
    }
        if(!order) return;
        const path = AppRoute.ADMIN_ORDERS_ORDER_INFO.replace(':id', order.id.toString());
        navigate(path);
    }

    

     const menuRef = useRef<HTMLTableCellElement>(null);

      useEffect(() => {
        const handleClickOutside = (event : MouseEvent) => {
            if(isActive && menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsActive(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    },[isActive])


    if (isLoading) return <div>Завантаження... ⏳</div>;
    if (!order) return <div>Замовлення не знайдено ❌</div>;

return (
    <div 
        onClick={(e) => handleRowClick(e)}
        className="pt-5 pb-9 pl-5 pr-15"
    >
        <h2 className='text-[24px] font-medium pt-5 pb-12'>Замовлення {order.orderNumber}</h2> 
        <div className='flex justify-between'>
            <div className='bg-white w-50 h-11 flex items-center pl-[10.5px] gap-[14.5px]'>
                <CalendarIcon/>
                <span className='leading-4'>{formatDate(order.createdAt)}</span>
            </div>
            <div 
                onClick={() => setIsActive(isActive === true ? false : true)}
                className='items-center flex w-50 h-11 bg-white justify-between px-2 py-2 cursor-pointer '
            >
            {orderStatus ? (
                <OrderStatus status={orderStatus} />
            ) : (
                <span>Статус завантажується... ⏳</span>
            )}
            <div 
                ref={menuRef}
                className='relative'
            >
                 <button 
                    type="button"
                    className={`${isActive ? "rotate-180" : ""}`}
                >
                    <Icons.arrowDown />
                </button>
                    {isActive && (
                        <div className={`absolute z-10 w-50 right-[-8px] mt-2.5 bg-white shadow-lg border border-gray-100`}>
                            {Object.entries(STATUS_CONFIG)
                                .filter(([key]) => key !== orderStatus)
                                .map(([key, value]) => {
                                    const statusKey = key as OrderStatusType;  
                                    return (
                                        <button 
                                            key={statusKey}
                                            type="button"
                                            className={`w-full text-left px-4 py-2 first:rounded-t-md last:rounded-b-md cursor-pointer ${value.hover}`}
                                            onClick={() => handleUpdateOrderStatus(statusKey)}
                                        >
                                            {value.title}
                                        </button>
                                    );
                                })
                            }
                        </div>
                    )}   
                </div>
            </div>
        </div>

        <div className='flex flex-row gap-[70px] py-12'>
            <OrderCard title='Замовник'>
                <div className="flex justify-between text-[12px]">
                    <span>Ім’я та прізвище:</span>
                    <span>{firstLastName}</span>
                </div>
                <div className="flex justify-between text-[12px]">
                    <span>Пошта: </span>
                    <span>{`${order.orderDetails.email ?? "Email не вказаний"}`}</span>
                </div>
                <div className="flex justify-between text-[12px]">
                    <span>Номер телефону: </span>
                    <span>{`${order.orderDetails.phone ?? "Телефон не вказаний"}`}</span>
                </div>
            </OrderCard>   
           <OrderCard title='Оплата'>
                <div className="flex justify-between text-[12px]">
                    <span className='whitespace-nowrap'>Спосіб оплати:</span>
                    <span className='text-end'>{paymentLabel}</span>
                </div>
                <div className="flex justify-between text-[12px]">
                    <span>Картка: </span>
                    <div className='flex items-center gap-1'>
                        <MasterCard/>
                        <span>**** **** **** 8922</span>
                    </div>
                </div>
                <div className="flex justify-between text-[12px]">
                    <span>Номер телефону: </span>
                    <span>{`${order.orderDetails.phone ?? "Телефон не вказаний"}`}</span>
                </div>
            </OrderCard>  
            <OrderCard title='Доставка'>
                <div className="flex justify-between text-[12px]">
                    <span>Спосід доставки:</span>
                    <span>{deliveryLabel}</span>
                </div>
                <div className="flex justify-between text-[12px]">
                    <span>Адреса: </span>
                    <span>{`${order.orderDetails.city ?? "Адреса не вказана"}`}</span>
                </div>
                <div className="flex justify-between text-[12px]">
                    <span>Отримувач: </span>
                    <span>{fullName}</span>
                </div>
            </OrderCard>   
        </div>

        <div className='bg-white px-2 py-3 rounded-xl'>
            <h2 className='text-[24px]'>Товари</h2>
            <div className='grid grid-cols-4 py-7 text-[#727272]'>
                <span>Артикул</span>
                <span className='pl-10'>Назва Товару</span>
                <span className='text-center pl-15'>Кількість</span>
                <span className='text-end pr-[44px]'>Сума</span>
            </div>
            {order.items.map((item) => (
                <div className='grid grid-cols-4 mb-2.5' key={item.id}>
                    <span>{item.product.sku}</span>
                    <span className='pl-10'>{item.product.name} "{item.product.collectionName}"</span>
                    <span className='text-center'>{totalItemsCount}</span>
                    <span className='text-end pr-[23px]'>₴ {item.product.price.normalPrice}</span>
                </div>
            ))}
        </div>

        <div className='flex flex-col text-end py-12 gap-6'>
            <div>
                <span className='pr-63'>Послуги Доставки</span>
                <span className='text-[#5B242A]'>0 грн </span>
            </div>
            <div className=' gap-20'>
                <span className='text-[20px] pr-63'>Разом</span>
                <span className='text-[#5B242A] text-[24px] font-serif'>{formatPrice(order.totalPrice)} грн </span>
            </div>
        </div>

        <div className='flex gap-5 justify-end'>
            <button className='px-13 py-2.5 border-1 text-[20px] cursor-pointer'>Скасувати</button>
            <button className='bg-[#5B242A] text-[20px] px-7 py-2.5 text-white cursor-pointer'>Зберегти Зміни</button>
        </div>
    </div>
);
       
}