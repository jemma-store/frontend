import { OrderStatusType, STATUS_CONFIG } from "@/admin-panel/constants/statusConfig";

interface OrderStatusProps {
    status : OrderStatusType;
}

export const OrderStatus = ({status} : OrderStatusProps) => {
    const config = STATUS_CONFIG[status];
    
    if(!config) return <span className="bg-red-400">{config}</span>

    return (
        <span className={`${config.bgColor} p-1`}>
            {config.title}
        </span>
    )
}