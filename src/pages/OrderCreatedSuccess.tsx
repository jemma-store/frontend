import { AppRoute } from "@/enums";
import { useLocation, Link } from "react-router-dom"

import { deliveryMethods, paymentMethods } from "@/constants/checkoutOptions";

import { IFullOrderDetails } from "@/types/orderDetails";

export const OrderCreatedSuccess = () => {

    const location = useLocation();
    const orderData = location.state as IFullOrderDetails;

    const deliveryMethodIdFromServer = orderData.orderDetails.deliveryMethod;
    const paymentMethodIdFromServer = orderData.orderDetails.paymentMethod;

    const deliveryMethodObj = deliveryMethods.find((item) => item.id === deliveryMethodIdFromServer);
    const paymentMethodObj = paymentMethods.find((item) => item.id === paymentMethodIdFromServer) 

    return (
        <>

         {orderData ? 
            <div className="container mt-30 leading-[130%]">
                <section className="flex flex-col text-center gap-8">
                    <h2>Дякуємо за замовлення!</h2>
                    <p className="text-[16px] leading-[130%]">Ваше замовлення успішно сформавано та буде опрацьоване найближчим часом</p>
                </section>

                <h2 className="text-center py-8">Замовлення {orderData.orderNumber}</h2>

                <div className="flex flex-col gap-5 ">
                    <div className="flex justify-between ">
                        <span>Спосіб доставки </span>
                        <span className="text-[#5B242A] text-[16px] text-end">{deliveryMethodObj?.label}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Сума замовлення</span>
                        <span className="text-[#5B242A] text-[16px] text-end">{orderData.totalPrice.toLocaleString('uk-UA')} грн</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Email підтвердження</span>
                        <span className="text-[#5B242A] text-[16px] text-end">{orderData.orderDetails.email}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="shrink-0">Спосіб оплати</span>
                        <span className="text-[#5B242A] text-[16px] text-right">{paymentMethodObj?.label}</span>
                    </div>
                </div>

                <div className="flex flex-col py-8 gap-8 ">
                    <Link to={AppRoute.PRODUCTS}>
                        <button className="bg-[#5B242A] w-2/3 block mx-auto text-white text-[16px] p-3 " >Продовжити покупки</button>
                    </Link>
                    <Link to={AppRoute.USER_ORDERS}>
                        <button className="w-2/3  block mx-auto text-[16px] p-3 border-1">Відстежити замовлення</button>
                    </Link>
                </div>
            </div> : (
                <div className="flex flex-col gap-8">
                    <h2 className="mt-50 text-center leading-[130%]">"Упс! Схоже, ви ще не зробили замовлення"</h2>
                    <Link to={AppRoute.CART}>
                    <button className="bg-[#5B242A] w-2/3 text-white text-[16px] p-3">
                        Перейти до покупок
                    </button>
                    </Link>
                </div>
        )}
        </>
       
       
    )
}

