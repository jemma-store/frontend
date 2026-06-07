import { useEffect } from "react"
import { useProductStore } from "@/store"
import { Pagination } from "@/features/products/Pagination"
import { useCatalogStore } from "@/store";
import { AdminProductCard } from "./AdminProductCard";
import { IProductItem } from "@/types/product";

interface ProductListProps {
    filteredProducts : IProductItem[];
    searchQuery : string;
    category : string
    collection : string
    modalIsOpen : boolean;
    onDeleteRequest : (product: IProductItem) => void;
}

export const ProductList = ({filteredProducts, searchQuery, category, collection, modalIsOpen, onDeleteRequest} : ProductListProps) => {

    const {products, loading} = useProductStore()
    const currentPage = useCatalogStore((state) => state.page);
    const setPage = useCatalogStore((state) => state.setPage);

    console.log(products)

    useEffect(() => {
        const controller = new AbortController();
        useProductStore.getState().fetchProducts(controller.signal);
        return () => controller.abort();
    }, [currentPage]);

    if (loading) return <div>Завантажання... 🔄</div>

    const productToDisplay = searchQuery.trim().length >= 1 || category || collection 
    ? filteredProducts 
    : products.content;

    if(productToDisplay.length === 0) {
        return (
            <div className="flex justify-center items-center py-20 text-xl text-[#727272]">
                За вашим запитом нічого не знайдено 
            </div>
        )
    }

    return (
        <>
            <div className="grid grid-cols-3 gap-15">
                {productToDisplay.map((item) => (
                    <AdminProductCard
                        modalIsOpen={modalIsOpen}
                        onDeleteCard={() => onDeleteRequest(item)}
                        onEditCard={() => console.log("test")}
                        key={item.id} 
                        product={item}
                    />
                ))}
            </div>
            {searchQuery === "" && !category && !collection && products.page.totalPages > 1  && (
                 <Pagination 
                    totalPages={products.page.totalPages}
                    currentPage={currentPage}
                    onChange={setPage}
                />
            )}
        </> 
    )
}