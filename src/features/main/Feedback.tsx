import { reviews } from '@/mock/reviews';
import { ReviewSlider } from './ReviewSlider';

export const Feedback = () => {
  return (
    <section className="w-full relative pb-10">
      <h2 className="text-center mb-5">Відгуки наших клієнтів</h2>
      <div className="max-w-[1440px] max-h-[690px] mx-auto relative px-4">
        <ReviewSlider
          slides={reviews}
          classname="w-full h-full review-slider"
          space={20}
          pagination={false}
          loop={true}
        />
      </div>
    </section>
  );
};
