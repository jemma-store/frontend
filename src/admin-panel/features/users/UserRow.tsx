import { EmailIcon } from "@/components/ui/EmailIcon";
import { PhoneIcon } from "@/components/ui/PhoneIcon";
import { AppRoute } from "@/enums";
import { IUserItem } from "@/types/user" 
import { Link} from "react-router-dom";

interface UserRowProps {
    user : IUserItem;
}

export const UserRow = ({user} : UserRowProps) => {

    const totalSpends = user.orders?.reduce((sum, order) => {
        return sum + order.totalPrice;
    }, 0) || 0; 

    const path = AppRoute.ADMIN_USERINFO_PAGE.replace(":id", user.id.toString());

    return (
        <tr>
            <td>{user.firstName} {user.lastName}</td>
            <td className="pt-8">
                <div className="flex-col">
                    <div className="flex items-center gap-1">
                        <span><EmailIcon/></span>
                        <span>{user.email ?? "Електронна пошта не вказана"}</span>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <span><PhoneIcon/></span>
                        <span>{user.phone ?? "Телефон не вказано"}</span>
                    </div>
                </div>
            </td>
            <td>{user.orders?.length}</td>
            <td>{user.orders?.length}</td>
            <td>{totalSpends}</td>
            <td className="pt-4">
                <div className="flex justify-end">
                    <Link to={path}>
                        <button className="py-2.5 px-4 border bg-[#F0ECE9] hover:opacity-70 cursor-pointer">Переглянути</button>
                    </Link>
                </div>
            </td>
        </tr>
    )
}