import { FC, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Pagination } from 'swiper/modules';
import type { IProductItem } from '@/types/product';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface MobileProductSwiperProps {
    product: IProductItem;
}

export const MobileProductSwiper:FC<MobileProductSwiperProps> = ({product}) => {
    const [thumbsSwiper] = useState(null);
    const images = product.images || [];

    return(

        <div className='w-full'>
            <Swiper
                modules={[Thumbs, Pagination]}
                slidesPerView={1}
                thumbs={{ swiper: thumbsSwiper }}
                pagination={{
                clickable: true,
                }}
            >
                {images.map((img, index) => (
                    <SwiperSlide key={index}>
                        <img 
                        src={img.url} 
                        alt={product.name}
                        className='w-full h-auto object-cover'
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}