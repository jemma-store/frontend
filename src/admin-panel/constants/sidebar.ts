import { Icons } from "../icons";

interface SidebarItem {
  title: string;
  path: string;
  icon: React.FC<{ className?: string }>;
}

export const sidebarMenu: SidebarItem[] = [
    {
        title : "Дашборд",
        icon : Icons.dashboard,
        path : "/admin/dashboard"
    },
    {
        title : "Товари",
        icon : Icons.products,
        path : "/admin/products"
    },
    {
        title : "Замовлення",
        icon : Icons.orders,
        path : "/admin/orders"
    },
    {
        title : "Користувачі",
        icon : Icons.users,
        path : "/admin/users"
    },
]