interface SlideData {
  background?: string;
  bgMobile?: string;
  title?: string;
  subtitle?: string;
}

export interface SlideDataReview extends SlideData {
 productId?: number; 
  productCategory?: string; 
  productCollection?: string; 
  productTitle?: string;
  id?: number;
  rating?: number | null;
  date?: string;
  text?: string;
  customerName?: string;
  location?: string;
  image?: string;
  hasProductImage?: boolean;
  avatar?: string;
}

export interface SliderProps {
  slides: SlideDataReview[];
  classname: string;
  pagination?: boolean;
  navigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  space?: number;
  view?: number | string;
}
