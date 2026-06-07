import { useEffect, useState } from "react";

import { AdminTable } from "@/admin-panel/components/AdminTable";
import { SelectDropdown } from "@/admin-panel/components/SelectDropdown"
import { getOrdersByPeriodService } from "@/admin-panel/services/getOrdersByPeriodService"
import { Pagination } from "@/features/products/Pagination"
import { getQueryParams, setQueryParams } from '@/utils/urlParams';
import { useSearchParams } from "react-router-dom";
import { ordersHeaders } from "@/admin-panel/constants/tableHeaders";
import { Icons } from "@/admin-panel/icons"
import { FILTER_BY_DATA } from "@/admin-panel/constants/filterByDate";
import { OrderRow } from "@/admin-panel/features/orders/components/OrderRow";
import { IFullOrderDetails } from "@/types/orderDetails";

interface PaginationData {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export const OrdersPage = () => {
    const [period, setPeriod] = useState("MONTH");
    const [pagination, setPagination] = useState<PaginationData>({
        number: 0,
        size: 9,
        totalElements: 0,
        totalPages: 0
    });
    const [currentPage, setCurrentPage] = useState(0)
    const [orders, setOrders] = useState<IFullOrderDetails[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();


      const handlePageChange = (clickedPage: number) => {
        const backendPage = clickedPage - 1;
        setCurrentPage(backendPage)
    
        setSearchParams(
          setQueryParams({
            ...getQueryParams(searchParams),
            page: clickedPage,
          }),
        );
      };
      
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const result = await getOrdersByPeriodService(period, currentPage, 9);
                    console.log("Отримані дані з бекенду:", result); 
                    setOrders(result.content);
                    setPagination(result.page)
                    console.log("пагінація :", result.page)
                } catch (error) {
                    console.error("Помилка запиту:", error);
                }
            };
            fetchData();
        }, [period, currentPage]);

    return (
        <div className="flex flex-col pl-5 pr-15">
            <div className="flex items-center justify-between pb-10">
                <h2 className="text-[24px]">Історія замовлень</h2>
                <div className="w-1/5">
                    <SelectDropdown
                        options={FILTER_BY_DATA}
                        icon={<Icons.calendar/>}
                        value={period}
                        onChange={setPeriod}
                    />
                </div>  
            </div>
            {orders.length <=0 ? (
                <span className="text-center text-2xl">За обраний період замовлень не було</span>
            )
            :
            (
                <div>
                    <AdminTable 
                    tableHeaders={ordersHeaders} 
                    tableColor="bg-white"
                    >
                    {orders.map((order, index) => (
                        <OrderRow 
                            key={order.id} 
                            order={order} 
                            index={index} 
                            total={orders.length}
                            showUserColumn={true}
                        />
                    ))}
                    </AdminTable>
                    <Pagination 
                        totalPages={pagination.totalPages}
                        currentPage={currentPage + 1}
                        onChange={(p: number) => handlePageChange(p)}
                    />
                </div>
            )}
        </div>
    )
}