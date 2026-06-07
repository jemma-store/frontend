import { useSmartCart } from "@/lib/hooks/useSmartCart";
import { CardCheckout } from './CardCheckout';


export const HeaderCheckout = () => {

    const { cartItemsWithData } = useSmartCart();

    return (
        <div>
            <h2 className='pt-12 pb-2 text-[20px] md:hidden'>Замовлення</h2>
            <span className='text-[12px] md:hidden'>1 товар</span>
            <div className="flex flex-col w-full gap-7 md:p-5">
                {cartItemsWithData.map(({ product, quantity }) => {
                    if (!product) return null;
                    return <CardCheckout 
                        key={product.id} 
                        item={product} 
                        quantity={quantity} />;
                })}
            </div>
        </div>
       
    )
}