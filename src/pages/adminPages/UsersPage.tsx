import { useEffect, useState } from "react"
import { AdminTable } from "@/admin-panel/components/AdminTable"
import SearchIcon from "@/admin-panel/icons/SearchIcon"
import { getAllUsers } from "@/admin-panel/services/getAllUsers"
import { usersHeaders } from "@/admin-panel/constants/tableHeaders"
import { UserRow } from "@/admin-panel/features/users/UserRow"
import { IUserItem } from "@/types/user"
import { useDebounce } from "@/lib/hooks/useDebounce"
import { searchUserService } from "@/admin-panel/services/serchUserService"

export const UsersPage = () => {
    const [users, setUsers] = useState<IUserItem[]>([])
    const [searchQuery, setSearchQuery] = useState("");
    const debouncedValue = useDebounce(searchQuery, 500)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllUsers();
                setUsers(Array.isArray(result) ? result : []);
            } catch (error) {
                console.error("Помилка при отриманні всіх користувачів:", error);
                setUsers([]);
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchUserQueryData = async () => {
            try {
                if (!debouncedValue.trim()) {
                    const allUsers = await getAllUsers();
                    setUsers(Array.isArray(allUsers) ? allUsers : []);
                    return;
                }

                const result = await searchUserService(debouncedValue, 0, 20);
                console.log("Структура результату:", result);

                if (Array.isArray(result)) {
                    setUsers(result);
                } 
                else if (result && Array.isArray(result.content)) {
                    setUsers(result.content);
                } 
                else {
                    setUsers([]);
                }
            } catch (error) {
                console.error("Помилка пошуку:", error);
                setUsers([]);
            }
        };

        fetchUserQueryData();
    }, [debouncedValue]);

    return (
        <div className="pl-[30px] pr-15">
            <h3 className="text-[24px]">Користувачі</h3>
            <div className="relative flex-3 my-12">
                <div className="absolute top-1/2 -translate-y-1/2 left-3">
                    <SearchIcon />
                </div>
                <input
                    type="text"
                    className="flex items-center gap-3 text-[#727272] bg-white py-3 pl-11 w-full focus:outline-none"
                    placeholder="Пошук користувачів"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                />
            </div>
            <div className="bg-white p-6">
                <AdminTable 
                    tableHeaders={usersHeaders} 
                    tableColor="bg-white"
                >
                    {Array.isArray(users) && users.length > 0 ? (
                        users.map((user) => (
                            <UserRow key={user.id} user={user} />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={usersHeaders.length} className="text-center py-4">
                                Користувачів не знайдено
                            </td>
                        </tr>
                    )}
                </AdminTable>
            </div>
        </div>
    )
}