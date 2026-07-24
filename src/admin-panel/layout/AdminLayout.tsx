import { useEffect, useRef} from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { sidebarMenu } from "../constants/sidebar"
import { useCatalogStore } from "@/store";
import { BreadCrumbs } from "@/components/BreadCrumbs";
import { LeaveButton } from "@/components/ui/LeaveButton";
import { useAuthStore } from "@/store";
import { useUserStore } from "@/store";

const breadcrumbDictionary: Record<string, string> = {
    "admin": "Дешборд",
    "products": "Товари",
    "add-new-product": "Новий товар",
    "orders": "Замовлення",
    "order-info": "Деталі замовлення",
    "users": "Користувачі",
    "user-info": "Профіль користувача"
};

export const AdminLayout = () => {
    const { pathname } = useLocation();
    const contentRef = useRef<HTMLDivElement>(null);
    const currentPage = useCatalogStore((state) => state.page);
    const logout = useAuthStore(state => state.logout)
    const clearUser = useUserStore((state) => state.clearUser)
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname, currentPage]);

    const showBreadcrumbs = 
        pathname.includes("/admin/products/add-new-product") ||
        pathname.includes("/admin/orders/order-info") || 
        pathname.includes("/admin/users/user-info");

    const pathNames = pathname.split("/").filter(Boolean);

    const breadcrumbItems: { label: string; href: string }[] = [];

    pathNames.forEach((segment, index) => {
        const href = "/" + pathNames?.slice(0, index + 1).join("/");
        const label = breadcrumbDictionary[segment];

        if (label) {

            breadcrumbItems.push({ label, href });
        } else if (!isNaN(Number(segment))) {
            if (breadcrumbItems.length > 0) {
                breadcrumbItems[breadcrumbItems.length - 1].href = href;
            }
        } else {
            breadcrumbItems.push({ label: segment, href });
        }
    });

    const handleLogout = () => {
        logout();
        clearUser();
        navigate("/");
    }

    return (
        <div className="relative grid grid-cols-[0.2fr_1fr] min-h-screen ">
            <aside className="pt-24 pl-15 pr-10 flex flex-col gap-8 bg-[#F6F6F6]">
                    {sidebarMenu.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                to={item.path} 
                                key={item.path} 
                                className={({isActive}) => 
                                    `flex items-center gap-5 cursor-pointer 
                                    ${isActive ? "text-[#5B242A]" : "text-[#727272]" }`}
                                >
                                <Icon/>
                                <span className="text-[20px]">{item.title}</span>
                            </NavLink>
                        )
                    })}
               
            </aside>

            <div 
                className="flex fixed left-15 bottom-0 mt-auto gap-5 mb-20 items-center hover:opacity-70 cursor-pointer"
                onClick={handleLogout}
            >
                <LeaveButton/>
                <span className="text-[20px] leading-[130%] text-[#727272] font-normal">Вийти</span>
            </div>

            <div className="mt-25" ref={contentRef}>
                {showBreadcrumbs && (
                    <div className="pl-5">
                        <BreadCrumbs items={breadcrumbItems} />
                    </div>
                )}
                <Outlet/>
            </div>
        </div>
    )
}