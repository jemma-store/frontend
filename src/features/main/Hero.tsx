import { HeroSlider } from './HeroSlider';
import { heroSlides } from '@/mock';

export const Hero = () => {
  return (
    <section className="relative w-full lg:h-screen h-[376px] pt-6 lg:pt-0 text-main section-indent">
      <HeroSlider
        slides={heroSlides}
        classname="w-full h-full hero-slider"
        loop={false}
        autoplay={false}
      />
    </section>
  );
};
