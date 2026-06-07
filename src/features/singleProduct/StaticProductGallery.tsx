import { FC } from "react";
import { IProductItem } from "@/types/product";

interface StaticProductGalleryProps {
    product : IProductItem
}

export const StaticProductGallery:FC<StaticProductGalleryProps> = ({product}) => {
    const firstImage = product.images[0];

        return (
        <div className="flex flex-col w-full max-w-[650px] items-start gap-5">
            {firstImage && (
                <img
                    key={product.id} 
                    src={firstImage.url}
                    alt={product.name}
                    className="w-full h-[full] md:h-[344px] xl:h-[690px] object-cover"
                />
            )}

            <div className="flex items-center gap-5 w-full md:grid md:grid-cols-1 xl:flex ">
                {product?.images
                    .map((image, index) => (
                        <div
                            key={index}
                            className="w-full h-[344px] bg-cover bg-center"
                            style={{ backgroundImage: `url(${image.url})` }}
                            role="img"
                        />
                    ))
                    .slice(1)} 
            </div>
        </div>
    );

} 