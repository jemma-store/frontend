import { useState} from "react";
import { useNavigate } from "react-router-dom";
// import InfoIcon from "@/admin-panel/icons/InfoIcon";
import VerticalBreadCrumble from "@/admin-panel/icons/VerticalBreadCrumble";
import { IProductItem } from "@/types/product";
// import { deleteProductByIdService } from "@/admin-panel/services/productService";


interface AdminProductCardProps {
    product: IProductItem;
    modalIsOpen : boolean;
    onDeleteCard : () => void;
    onEditCard : () => void;
}

export const AdminProductCard = ({product, onDeleteCard} : AdminProductCardProps) => {
    const [isMenuOpen , setIsMenuOpen] = useState(false);
    // const [isHovered, setIsHovered] = useState(false);
    // const [tooltipPosition, setTooltipPosition] = useState("top-full right-0");
    const navigate = useNavigate();
    // const tooltipRef = useRef<HTMLDivElement>(null)
    const hasSizes = product.productSizes && product.productSizes.length > 0 ;
    const spacingClasses = hasSizes ? "pb-[11px] pt-[11px]" : "pt-9 pb-9";

// const handleMouseEnter = () => {
// setIsHovered(true);

//     if (tooltipRef.current) {
//         const rect = tooltipRef.current.getBoundingClientRect();
//         const hasSpaceBelow = window.innerHeight - rect.bottom >= 360;
//         const hasSpaceRight = window.innerWidth - rect.right >= 150;

//         if (hasSpaceBelow) {
//             setTooltipPosition("top-full right-0");
//         } else if (hasSpaceRight) {
//             setTooltipPosition("bottom-full right-0");
//         } else {
//             setTooltipPosition("bottom-full right-0");
//         }
//     }
// }

    return (
        <div className="px-2 pt-2 bg-white flex flex-col w-full">
            <div className="flex w-full">
                <div className="w-[92px] h-[120px]">
                    {product?.images?.map((img) => (
                        <div key={img.url}>
                            {img.isMainImage ? (
                                <img src={img.url} alt={product.name}></img>
                            ) : null}
                        </div>
                    ))}
                </div>
                <div className="flex flex-col pl-5 gap-4">
                    <span className="text-[#727272] text-[12px]">Артикул : {product.sku}</span>
                    <div>
                        <span>{product.name}</span> <span className="text-[#727272]">"{product.collectionName}"</span>
                    </div>
                    <span>{product?.price?.normalPrice} грн</span>
                </div>
                <div className="ml-auto relative flex flex-col">
                    <div 
                        className="text-[#727272] cursor-pointer "
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <VerticalBreadCrumble />
                    </div>
                    {isMenuOpen && (
                        <div className="absolute flex flex-col gap-2 py-4 right-0 top-6 bg-white shadow-md border rounded-md z-10 w-32">
                            <button 
                                onClick={() => navigate(`/admin/products/edit/${product.id}`)}
                                className="text-left pl-4 hover:text-white hover:bg-[#5B242A] hover-pl-5 cursor-pointer"
                            >
                                Редагувати
                            </button>
                            <button 
                                onClick={() => {
                                    onDeleteCard();
                                    setIsMenuOpen(false);
                                }} 
                                className="text-left pl-4 hover:text-white hover:bg-[#5B242A] cursor-pointer"
                            >
                                Видалити
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className={`flex flex-col gap-2 ${spacingClasses}`}>
                <div className="flex justify-between">
                    <span>Продажі</span>
                    <span>0</span>
                </div>
                <div className="flex justify-between">
                    <span>Залишок</span>
                    <span>{product.quantity}</span>
                </div>
                {/* {product.productSizes && product.productSizes.length >= 1 && (
                    <div className="flex justify-between items-center relative">
                        <span className="text-[12px] text-[#727272]">Залишки по розмірах</span>
                    <div 
                        ref={tooltipRef} 
                        onMouseEnter={handleMouseEnter} 
                        onMouseLeave={()=> setIsHovered(false)}
                    >
                        {!isHovered ? null 
                        : 
                        <div className={`${tooltipPosition} absolute bg-[#F0ECE9] z-100 pb-3`}>
                            <div className="grid grid-cols-2 gap-2 p-2"> 
                                <h2 className="text-[12px] leading-[120%] text-[#5B242A]">Розмір</h2>
                                <h2 className="text-[12px] leading-[120%] text-[#5B242A]">Залишок</h2>
                            </div>
                            {mockSizeQuantities.map((item, index) =>(
                                <div 
                                    key={index}
                                    className="grid grid-cols-2 px-3 gap-x-[30px] "
                                >
                                    <div className="flex flex-col">
                                        <span className="leading-[130%] mt-5 ml-2">{item.size}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="leading-[130%] mt-5 ml-3">{item.quantity}</span>    
                                    </div>
                                </div>
                            ))}
                        </div>
                        }
                        <InfoIcon />
                    </div>
                    </div>
                )} */}
            </div>
        </div>
    )       
}