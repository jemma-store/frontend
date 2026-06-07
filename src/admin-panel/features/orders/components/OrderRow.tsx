import { IFullOrderDetails } from "@/types/orderDetails"
import { OrderStatus } from "./OrderStatus";
import { Icons } from '../../../icons';
import { useState , useRef, useEffect} from "react";
import { STATUS_CONFIG } from "@/admin-panel/constants/statusConfig";
import { OrderStatusType } from "@/admin-panel/constants/statusConfig";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "@/enums";
import { formatDate, formatPrice } from "@/admin-panel/utils/data&priceTranslator";

interface OrderRowProps {
    order : IFullOrderDetails;
    index : number;
    total : number;
    showUserColumn? : boolean;
}

export const OrderRow = ({order, index, total, showUserColumn} : OrderRowProps) => {

    const [isActive, setIsActive] = useState(false);
    const [orderStatus, setOrderStatus] = useState<OrderStatusType>(order.status as OrderStatusType);

    const menuRef = useRef<HTMLTableCellElement>(null);

    const handleUpdateOrderStatus = (newStatus : OrderStatusType) => {
        setOrderStatus(newStatus)
        setIsActive(false)
    }

    const isLastItems = index >= total -3; 

    const positionClasses = isLastItems 
    ? "bottom-2.5 mb-10 top-auto" 
    : "top-10 mt-2 bottom-auto";

    const fullName = order.orderDetails.firstName || order.orderDetails.lastName === null || undefined || "" 
    ? "Не вказано" 
    : `${order.orderDetails.firstName}, ${order.orderDetails.lastName }`

    const allNamesString = order.items
        .map(item => item.product.name + " " + `"${item.product.collectionName}"`) 
        .join(", "); 

        const productsName = allNamesString.length > 25 
        ? allNamesString.slice(0, 25) + "..." 
        : allNamesString;

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

    const navigate = useNavigate()
    const handleRowClick = (event: React.MouseEvent) => {
        if (menuRef.current && menuRef.current.contains(event.target as Node)) {
        return;
    }
        const path = AppRoute.ADMIN_ORDERS_ORDER_INFO.replace(':id', order.id.toString());
        navigate(path);
    }
    
    return (
        <tr 
            onClick={(e) => handleRowClick(e)}
            className="transition-colors hover:bg-gray-300 cursor-pointer
        ">

            <td className="pl-8 py-4 ">{order.orderNumber}</td>
            <td className="pl-3 py-4 hover:bg-opacity-90">{productsName}</td>
            {showUserColumn ? (<td className="py-3 hover:bg-opacity-90">{fullName}</td>) : null}
            <td className="pl-8 py-4 hover:bg-opacity-90">₴ {formatPrice(order.totalPrice)}</td>
            <td 
                ref={menuRef} 
                className="w-35 pl-2 pt-4 relative text-sm flex items-center justify-between gap-5 hover:bg-opacity-90"
            >
                <OrderStatus
                    status={orderStatus}
                />
                <button 
                    type="button"
                    onClick={() => setIsActive(isActive === true ? false : true)}
                    className={`${isActive ? "rotate-180" : ""} cursor-pointer`}
                >
                    <Icons.arrowDown />
                </button>
                {isActive && (
                    <div className={`absolute left-0 z-10 w-35 bg-white rounded-md shadow-lg border border-gray-100 ${positionClasses}`}>
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
            </td>
            <td className="pr-8 py-4 hover:bg-opacity-90">
                {formatDate(order.createdAt)}
            </td>
        </tr>
    );
}