import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';

import { AppRoute } from '@/enums';
import { SliderProps } from '@/types/mainSlider';
import { CustomPagination } from '@/components/swiper';
import { setQueryParams } from '@/utils/urlParams';
import { useCatalogStore } from '@/store';

export const HeroSlider: FC<SliderProps> = ({ slides, classname, loop, autoplay }) => {
  const [activeIndex, setActiveIndex] = useState(0);
    const { page, sortBy, priceRange } = useCatalogStore();

  return (
    <>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 5000, disableOnInteraction: autoplay }}
        loop={loop}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className={classname}
      >
        {slides.map((slide, index) => {
          const bg = window.innerWidth >= 1024 ? slide.background : slide.bgMobile;
          
          return (
            <SwiperSlide key={index}>
              <div
                className={`relative w-full lg:h-screen h-[368px] bg-cover bg-center flex items-center justify-center py-6`}
                style={{ backgroundImage: `url(${bg})` }}
              >
                <div className="container lg:h-auto h-full lg:pl-[100px] lg:block flex flex-col items-center justify-between">
                  <h1 className="mb-5 max-w-[520px] pt-11 lg:pt-0 text-center lg:text-left">
                    {slide.title}
                  </h1>

                  <p className=" lg:w-[365px] lg:h-[53px] lg:mb-[40px] lg:block hidden">{slide.subtitle}</p>

                  <Link to={`${AppRoute.PRODUCTS}${setQueryParams({
                      page,
                      sortBy: sortBy,
                      minPrice: priceRange[0],
                      maxPrice: priceRange[1],
                    })}`} className="inline-block">
                    <button className="btn-buy">Купити</button>
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      <div className="absolute flex w-full items-center justify-center lg:bottom-[30px] bottom-[-10px] z-30 gap-[21px]">
        <CustomPagination total={slides.length} activeIndex={activeIndex} />
      </div>
    </>
  );
};
