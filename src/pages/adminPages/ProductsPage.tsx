import { SelectDropdown } from "@/admin-panel/components/SelectDropdown"
import { FILTER_BY_CATEGORY, FILTER_BY_COLLECTION } from "@/admin-panel/constants/filterByDate"
import { ProductList } from "@/admin-panel/features/products/ProductList"
import SearchIcon from "@/admin-panel/icons/SearchIcon"
import { AppRoute } from "@/enums"
import { Link, NavLink } from "react-router-dom"
import { useState, useEffect } from "react"
import { searchQueryService } from "@/admin-panel/services/searchFilterService"
// import { availableQuantityProducts } from "@/admin-panel/services/dashBoardStatsService"
import { ConfirmationModal } from "@/components/ConfirmationModal";
import { IProductItem } from "@/types/product"
import { deleteProductByIdService } from "@/admin-panel/services/productService"
import { CloseBtnX } from "@/components/ui/CloseBtnX"
import { useCatalogStore } from "@/store"

export const ProductsPage = () => {
    const [category, setCategory] = useState("")
    const [collection, setCollection] = useState("")
    const [searchQuery, setSearchQuery] = useState("");
    const [searchedProducts, setSearchedProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<IProductItem | null>(null);
    const currentPage = useCatalogStore((item) => item.page)
    // const [quantity, setQuantity] = useState<number | null>(null);
    // const [isHovered, setIsHovered] = useState(false);

    // const handleMouseEnter = async () => {
    //     const fetchService = availableQuantityProducts(id);
    // }

    const openDeleteModal = (product : IProductItem) => {
        setProductToDelete(product);
        setIsModalOpen(true);
    }

    const clearFilters = () => {
        setCategory("")
        setCollection("")
    }

    const handleConfirmDelete = async () => {
        if(productToDelete) {
            try{
                await deleteProductByIdService(productToDelete.id);
                console.log("deleting: ", productToDelete.id);
                setIsModalOpen(false);
                setProductToDelete(null);

            } catch (error){
                console.error(error);
            }
        }
    }
    
    useEffect(() => {
        const timerId = setTimeout(async () => {
        if (searchQuery.length === 0 && !category && !collection) {
            setSearchedProducts([]);
            return;
        }
        const data = await searchQueryService(
            searchQuery,
            12,
            currentPage > 0 ? currentPage -1 : 0,
            category ? [category] : [],     
            collection ? [collection] : []  
        );
        
        setSearchedProducts(data?.content || []); 
    }, 500);

    return () => clearTimeout(timerId);
}, [searchQuery, category, collection]);

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
        <div className="flex items-center justify-between pt-5 pb-12 w-full">
            <div className="relative flex-2">
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
            <div className="flex flex-2 gap-5 w-full">
                {category || collection ? (
                    <button 
                        className="flex items-center border-1  px-5 py-2.5 gap-1.5 whitespace-nowrap cursor-pointer"
                        onClick={clearFilters}
                    >
                        <div><CloseBtnX/></div>
                        <div>Скинути фільтри</div>
                    </button>
                ) : null}
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
        <div className="pb-14">
            <ProductList
                searchQuery={searchQuery}
                filteredProducts={searchedProducts}
                category={category}
                collection={collection}
                modalIsOpen={isModalOpen}
                onDeleteRequest={openDeleteModal}
            />
        </div>
        {isModalOpen && (
                <ConfirmationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onConfirm={handleConfirmDelete}
                    title={`Ви впевнені, що хочете видалити товар ${productToDelete?.name}`}
                    confirmText="Видалити"
                    cancelText="Скасувати"
                />
        )}
    </div>
)
}