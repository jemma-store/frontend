import { useEffect, useState } from "react"
import { NavLink, Link } from "react-router-dom"
import { AppRoute } from "@/enums"
import SearchIcon from "@/admin-panel/icons/SearchIcon"
import { SelectDropdown } from "@/admin-panel/components/SelectDropdown"
import { FILTER_BY_COLLECTION } from "@/admin-panel/constants/filterByDate"
import { FILTER_BY_CATEGORY } from "@/admin-panel/constants/filterByDate"
import { getDraftService } from "@/admin-panel/services/DraftsServices"
import { AdminProductCard } from "@/admin-panel/features/products/AdminProductCard" 
import { searchQueryService } from "@/admin-panel/services/searchFilterService"
import { useCatalogStore } from "@/store"

export const DraftsPage = () => {

    const [category, setCategory] = useState("")
    const [collection, setCollection] = useState("")
    const [searchQuery, setSearchQuery] = useState("");
    const [searchedProducts, setSearchedProducts] = useState([]);
    const [drafts, setDrafts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const currentPage = useCatalogStore((state) => state.page)

    useEffect(() => {
        const fetchDrafts = async () => {
            try {
                setIsLoading(true);
                const data = await getDraftService(0, 12);
                setDrafts(data.content);
            } catch (error) {
                console.error("Помилка завантаження чернеток", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchDrafts();
    }, [])

    useEffect(() => {
        const timerId = setTimeout(async () => {
            if (searchQuery.length === 0 && !category && !collection) {
                setSearchedProducts([]);
                return;
            }
            
            try {
                setIsLoading(true);
                const data = await searchQueryService(
                    searchQuery,
                    12,
                    currentPage > 0 ? currentPage - 1 : 0, 
                    category ? [category] : [],     
                    collection ? [collection] : []  
                );
                console.log("Результат пошуку:", data?.content);
                setSearchedProducts(data?.content || []); 
            } catch (error) {
                console.error("Помилка пошуку", error);
            } finally {
                setIsLoading(false);
            }
        }, 500);
    
        return () => clearTimeout(timerId);
    }, [searchQuery, category, collection, currentPage]);


    const baseProducts = (searchQuery.trim().length >= 1 || category || collection) 
        ? searchedProducts 
        : drafts;

    const draftsToDisplay = baseProducts.filter((item: any) => item.status === "DRAFT");

    return (
        <div className="pl-5 pr-15">
            <div className="flex justify-between ">
                <div className="flex gap-2">
                    <NavLink 
                        className={({ isActive }) => `pr-19 text-[24px] leading-[130%] text-[#1D110A] border-[#5B242A] ${isActive ? "border-b-2" : ""}`} 
                        to={AppRoute.ADMIN_PRODUCTS}>
                            Товари
                    </NavLink>
                    <NavLink 
                        className={({ isActive }) => `pr-19 text-[24px] leading-[130%] text-[#1D110A] border-[#5B242A]  ${isActive ? "border-b-2" : ""}`}  
                        to={AppRoute.ADMIN_DRAFTS}>
                            Чернетки
                    </NavLink>
                </div>
                <Link 
                    to={AppRoute.ADMIN_ADD_NEW_PRODUCT}
                    className="text-[20px] text-white bg-[#5B242A] px-[50px] py-2.5 cursor-pointer"
                >
                    Додати товар
                </Link>
            </div>
            
            <div className="flex items-center justify-between gap-40 pt-5 pb-12 w-full">
                <div className="relative flex-3">
                    <div className="absolute top-1/2 -translate-y-1/2 left-3">
                        <SearchIcon/>
                    </div>
                    <input
                        type="text" 
                        className="flex items-center gap-3 text-[#727272] bg-white py-3 pl-11 w-4/7 focus:outline-none" 
                        placeholder="Пошук товарів"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                    />
                </div>
                <div className="flex flex-2 gap-5">
                    <div className="w-full">
                        <SelectDropdown
                            value={category}
                            placeholder="Категорія"
                            options={FILTER_BY_CATEGORY}
                            onChange={setCategory}
                        />
                    </div>
                    <div className="w-full">
                        <SelectDropdown
                            value={collection}
                            placeholder="Колекція"
                            options={FILTER_BY_COLLECTION}
                            onChange={setCollection}
                        />  
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-15 pb-14">
                {/* Спочатку перевіряємо, чи йде завантаження */}
                {isLoading ? (
                    <div className="col-span-3 text-center py-20 text-xl text-[#727272]">
                         Завантаження...
                    </div>
                ) : draftsToDisplay.length > 0 ? (
                    draftsToDisplay.map((item: any) => (
                        <AdminProductCard
                            key={item.id}
                            product={item}
                            modalIsOpen={false}
                            onDeleteCard={() => console.log("Видалення чернетки", item.id)}
                            onEditCard={() => console.log("Редагування чернетки", item.id)}
                        />
                    ))
                ) : (
                    <div className="col-span-3 text-center py-20 text-xl text-[#727272]">
                         За вашим запитом нічого не знайдено 
                    </div>
                )}
            </div>
        </div>
    )
}