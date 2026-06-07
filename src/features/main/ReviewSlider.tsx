import { FC, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { StarIcon } from 'lucide-react';
import cn from 'classnames';

import 'swiper/css';

import { SliderProps } from '@/types/';
import { Card, CardContent } from '@/components/ui';
import { SlideDataReview } from '@/types/mainSlider';

import { useNavigate } from 'react-router-dom';

export const ReviewSlider: FC<SliderProps> = ({ slides, classname, pagination, space, loop }) => {
  const [, setActiveIndex] = useState(0);

  const navigate = useNavigate();

   const swiperBreakpoints = {
    0 : {
      slidesPerView : 2,
    },
    1024 : {
      slidesPerView : 3,
    },
    1440 : {
      slidesPerView: 4,
    }
  }

  return (
    <>
      <Swiper
        modules={[]}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className={classname}
        pagination={pagination}
        centeredSlides={true}
        breakpoints={swiperBreakpoints}
        spaceBetween={space}
        loop={loop}
      >
        {slides &&
          slides.map((slide: SlideDataReview) => (           
            <SwiperSlide
              key={slide?.id}
              className="flex justify-center transition-all duration-500 sm:mb-10"
            >
              {({ isActive }) => (
                <Card
                  className={cn(
                    'transition-all duration-500 ease-in-out bg-transparent mx-auto cursor-pointer',
                    isActive ? 'z-10 shadow-main' : 'opacity-70',
                  )}
                >
                  <CardContent className="p-3 flex flex-col h-[302px] sm:h-[550px] justify-between sm:p-5">
                    <div
                      className='flex items-center justify-between mb-2 sm:mb-5'
                    >
                      <div className="flex items-center sm:gap-2 gap-1">
                        {[...Array(5)].map(
                          (_, i) =>
                            slide.rating !== undefined && (
                              <StarIcon
                                key={i}
                                className='sm:w-4 sm:h-4 w-2 h-2 color-yellow-400 fill-current text-yellow-500'
                              />
                            ),
                        )}
                      </div>
                      <p className='text-[12px] sm:text-[16px]'>{slide.date}</p>
                    </div>

                    <div className={cn('flex flex-col flex-grow', isActive ? 'mb-5' : 'mb-3')}>
                      <p
                        className={cn(
                          'transition-all duration-500 ease-in-out',
                          isActive ? 'max-h-[356px] line-clamp-9 md:text-[20px] md:line-clamp-10' : 'max-h-[275px] line-clamp-9 md:text-[20px] md:line-clamp-10',
                          !slide.hasProductImage? "line-clamp-5" : null,
                          // slide.hasProductImage && isActive && 'line-clamp-1',
                          // slide.hasProductImage && !isActive && 'line-clamp-5',
                        )}
                      >
                        {slide.text}
                      </p>

                      {/* Фотографію товару вирішили видалити */}
                      {/* {slide.hasProductImage && (
                        <img
                          src={slide.image}
                          alt="Product Image"
                          className='w-full h-auto object-cover mt-2'/>
                      )} */} 
 
                    </div>

                    <div className="flex items-center justify-start gap-2">
                      {slide.avatar && (
                        <img
                          className="w-[24px] h-[24px] sm:w-[70px] sm:h-[70px] rounded-full object-cover"
                          src={slide.avatar}
                          alt={slide.customerName}
                        />
                      )}

                      <div className="flex flex-col gap-1">
                        <p className='text-[12px] sm:text-[20px]' >{slide.customerName}</p>
                        <p className="text-[12px] sm:text-[16px] text-gray-500">{slide.location}</p>
                      </div>
                    </div>
                   
                      <button 
                      onClick={() => 
                        navigate(
                         `/products/${slide.productId}/${slide.productCategory}/${slide.productCollection}/${slide.productTitle}`
                        )
                    }
                      className={cn(
                        'text-[12px] md:text-[20px] border-1 p-2 mt-5 mb-2 cursor-pointer hover:bg-black hover:text-white', isActive? "block" : "hidden",
                      )}>Переглянути товар
                      </button>

             </CardContent>
                </Card>
              )}
            </SwiperSlide>
          ))}
      </Swiper>
    </>
  );
};
