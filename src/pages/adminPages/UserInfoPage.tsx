import { useState, useEffect } from "react";
import { IUserItem } from "@/types/user";
import { useParams } from "react-router-dom";
import { getUserById } from "@/admin-panel/services/getAllUsers";
import { AdminTable } from "@/admin-panel/components/AdminTable";
import { ordersHeaders } from "@/admin-panel/constants/tableHeaders";
import { OrderRow } from "@/admin-panel/features/orders/components/OrderRow";
import { useProfileEditor } from "@/lib/hooks/useProfileEditor";

export const UserInfoPage = () => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<IUserItem | null>(null);
    const [userDataIsLoading, setUserDataIsLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    
    const { formData, updateField, saveProfile, isLoading } = useProfileEditor(user, id);

    const userOrders = user?.orders || [];

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setUserDataIsLoading(true);
                if (!id) return;
                const data = await getUserById(id);
                setUser(data);
                console.log("дані з беку : ", data);
            } catch (error) {
                console.error("user Error : ", error);
            } finally {
                setUserDataIsLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    const handleSave = async () => {
        await saveProfile();
        setIsEditing(false);
        if (formData) {
            setUser((prevUser) => prevUser ? { ...prevUser, ...formData } : null);
        }
    };

    return (
        <div className="mt-[-30px]">
            {userDataIsLoading ? (
                "Дані завантажуються"
            ) : (
                <div className="flex flex-col pl-5 pr-15 w-full pt-17 ">
                    <div className="bg-white rounded">
                        <div className="flex py-2.5 px-6 gap-135">
                            <h3 className="leading-[130%] text-[24px]">Основні дані</h3>
                            <h3 className="leading-[130%] text-[24px]">Додаткові дані</h3>
                        </div>
                        <div className="flex flex-col gap-9.5 pb-9.5">
                            <div className="grid grid-cols-3 pl-8 gap-y-6">
                                {/* Поле Ім’я */}
                                <div className="flex flex-col gap-3.5 pr-6">
                                    <span className="text-[#727272]">Ім’я</span>
                                    {isEditing ? (
                                        <input 
                                            className="border-b border-gray-300 py-1 outline-none focus:border-[#5B242A] transition-colors"
                                            value={formData?.firstName || ""}
                                            onChange={(e) => updateField('firstName', e.target.value)}
                                        />
                                    ) : (
                                        <span>{user?.firstName}</span>
                                    )}
                                </div>
                                {/* Поле Прізвище */}
                                <div className="flex flex-col gap-3.5 pr-6">
                                    <span className="text-[#727272]">Прізвище</span>
                                    {isEditing ? (
                                        <input 
                                            className="border-b border-gray-300 py-1 outline-none focus:border-[#5B242A] transition-colors"
                                            value={formData?.lastName || ""}
                                            onChange={(e) => updateField('lastName', e.target.value)}
                                        />
                                    ) : (
                                        <span>{user?.lastName}</span>
                                    )}
                                </div>
                                {/* Поле Стать */}
                                <div className="flex flex-col gap-3.5 pr-6">
                                    <span className="text-[#727272]">Стать</span>
                                    {isEditing ? (
                                        <input 
                                            className="border-b border-gray-300 py-1 outline-none focus:border-[#5B242A] transition-colors"
                                            value={formData?.gender || ""}
                                            onChange={(e) => updateField('gender', e.target.value)}
                                        />
                                    ) : (
                                        <span>{user?.gender ?? "Не вказано"}</span>
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-3 pl-8 gap-y-6">
                                {/* Поле Телефон */}
                                <div className="flex flex-col gap-3.5 pr-6">
                                    <span className="text-[#727272]">Номер телефону</span>
                                    {isEditing ? (
                                        <input 
                                            className="border-b border-gray-300 py-1 outline-none focus:border-[#5B242A] transition-colors"
                                            value={formData?.phone || ""}
                                            onChange={(e) => updateField('phone', e.target.value)}
                                        />
                                    ) : (
                                        <span>{user?.phone}</span>
                                    )}
                                </div>
                                {/* Поле Пошта */}
                                <div className="flex flex-col gap-3.5 pr-6">
                                    <span className="text-[#727272]">Електронна пошта</span>
                                    {isEditing ? (
                                        <input 
                                            className="border-b border-gray-300 py-1 outline-none focus:border-[#5B242A] transition-colors"
                                            value={formData?.email || ""}
                                            onChange={(e) => updateField('email', e.target.value)}
                                        />
                                    ) : (
                                        <span>{user?.email}</span>
                                    )}
                                </div>
                                {/* Поле День народження */}
                                <div className="flex flex-col gap-3.5 pr-6">
                                    <span className="text-[#727272]">День народження</span>
                                    {isEditing ? (
                                        <input 
                                            className="border-b border-gray-300 py-1 outline-none focus:border-[#5B242A] transition-colors"
                                            value={formData?.birthdate || ""}
                                            onChange={(e) => updateField('birthdate', e.target.value)}
                                        />
                                    ) : (
                                        <span>{user?.birthdate ?? "-"}</span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end gap-4 py-3 px-6">
                            {isEditing ? (
                                <>
                                    <button 
                                        className="px-6 py-2.5 border border-[#5B242A] text-[#5B242A] cursor-pointer hover:bg-gray-50 transition-colors"
                                        onClick={() => setIsEditing(false)}
                                    >
                                        Скасувати
                                    </button>
                                    <button 
                                        className="px-6 py-2.5 bg-[#5B242A] text-white cursor-pointer disabled:bg-gray-400 hover:bg-[#7a3038] transition-colors"
                                        onClick={handleSave}
                                        disabled={isLoading}
                                    >
                                        {isLoading ? "Збереження..." : "Зберегти"}
                                    </button>
                                </>
                            ) : (
                                <button 
                                    className="px-6 py-2.5 bg-[#5B242A] text-white cursor-pointer hover:bg-[#7a3038] transition-colors"
                                    onClick={() => setIsEditing(true)}
                                >
                                    Редагувати
                                </button>
                            )}
                        </div>

                        <div>
                            {/* <UserReviewsPublished/> */}
                        </div>

                    </div>
                    {userOrders.length >= 1 && (
                        <div className="pt-10 pb-29 rounded">
                            <AdminTable 
                                tableHeaders={ordersHeaders.filter((header) => header.label !== "Користувач")} 
                                tableColor="bg-white"
                            >
                                {userOrders.map((order, index) => (
                                    <OrderRow
                                        key={order.id} 
                                        order={order} 
                                        index={index} 
                                        total={userOrders.length || 0}
                                        showUserColumn={false}
                                    />
                                ))}
                            </AdminTable>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};