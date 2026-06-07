import DashboardIcon from "./DashboardIcon";
import OrdersIcon from "./OrdersIcon";
import ProductsIcon from "./ProductsIcon";
import UsersIcon from "./UsersIcon";
import CalendarIcon from "./CalendarIcon";
import ArrowDownIcon from "./ArrowDownIcon";

interface IconsProps {
    className? : string,
}

type IconMap = Record<string, React.FC<IconsProps>>;

export const Icons: IconMap = {
    dashboard : DashboardIcon,
    orders : OrdersIcon,
    products : ProductsIcon,
    users : UsersIcon,
    calendar : CalendarIcon,
    arrowDown : ArrowDownIcon,
}