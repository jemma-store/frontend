import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { uploadReview } from "@/services/reviewServics";
import { useForm } from "react-hook-form";
import { StarIcon } from "lucide-react";
import { useUserStore } from "@/store";
import { IOrderItem } from "@/types/orderDetails";

interface ReviewModalProps {
  isOpen: boolean;
  items: IOrderItem[] | null; 
  onClose: () => void;     
  onSuccess?: () => void; 
}

interface IReviewFormValues {
  score: string;
  text: string;
  images: File[];
  productId: string;
}

export const ReviewModal = ({ 
  isOpen, 
  onClose, 
  items, 
  onSuccess 
}: ReviewModalProps) => {

  const [isLoading, setIsLoading] = useState(false);
  const user = useUserStore((state) => state.currentUser);

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<IReviewFormValues>({
    defaultValues: {
      score: "0",
      text: "",
      images: [],
    }
  });

  const [hoverRating, setHoverRating] = useState<number>(0);
  const currentScore = Number(watch("score"));

  useEffect(() => {
    if (isOpen && items) {
      reset({
        score: "0",
        text: "",
        productId: String(items?.[0]?.product.id)
      });
      setHoverRating(0);
    }
  }, [isOpen, items, reset]);

  if (!items) return null;

  const onSubmitHandler = async (data: IReviewFormValues) => {
    setIsLoading(true);
    
    try {
      console.log(data)
      console.log(items)
      const response = await uploadReview({
        author: user?.firstName || "Клієнт",
        text: data.text,
        score: data.score,
        productId: String(items?.[0]?.product.id), 
        images: [],
      });

      console.log("✅ ВІДПОВІДЬ СЕРВЕРА:", response);
      onClose();
      if (onSuccess) {
        onSuccess(); 
      }

    } catch (error) {
      console.error("❌ ПОМИЛКА В onSubmit:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-[650px] max-w-[95vw] h-auto text-center p-7">
        
        <form onSubmit={handleSubmit(
            (data) => onSubmitHandler(data),
            (errors) => console.log("❌ ПОМИЛКА ВАЛІДАЦІЇ ФОРМИ:", errors)
        )}>
          <DialogTitle className="text-[16px] pb-5">
            Залиште свій відгук 
          </DialogTitle>
          
          <div className="flex gap-4 p-2 bg-grey-light/30 rounded-md">
              <img 
                src={items?.[0]?.product?.images?.[0]?.url || '/placeholder.png'} 
                alt={items?.[0]?.product?.name}
                className="w-[84px] h-[116px] object-cover" 
              />
              <div className="flex md:justify-start md:items-center gap-1">
                  <span className="font-medium">{items?.[0]?.product.name}</span>
                  <span className="text-gray-600">"{items?.[0]?.product.collectionName}"</span>
              </div>
          </div>

          <section className="text-left flex flex-col gap-3 pt-5">
              <span>Ваша оцінка*</span>
              <div 
                  className="flex gap-1 py-2" 
                  onMouseLeave={() => setHoverRating(0)} 
              >
                  {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="cursor-pointer transition-transform hover:scale-110" 
                        onMouseEnter={() => setHoverRating(star)} 
                        onClick={() => setValue("score", String(star))}
                      >
                      <StarIcon 
                          fill={(hoverRating !== 0 ? star <= hoverRating : star <= currentScore) ? "#FFC107" : "none"}
                          stroke={(hoverRating !== 0 ? star <= hoverRating : star <= currentScore) ? "#FFC107" : "#FFCC00"}
                          className="transition-colors duration-200"
                      />
                      </button>
                  ))}
              </div>
              <span className="text-[12px] text-[#727272]">1 - незадовільно, 5 - відмінно</span>
          </section>

          <div className="flex flex-col text-left gap-2">
              <label className="text-sm font-medium pt-5">Ваш відгук*</label>
              <textarea 
                {...register("text", { 
                  required: "Це поле обов'язкове", 
                  minLength: { value: 10, message: "Мінімум 10 символів" } 
                })}
                className="border p-3 h-25 resize-none focus:outline-button text-[12px] rounded-xl"
                placeholder="Розкажіть про свій досвід користування товаром. Що вам сподобалось або не сподобалось?"
              />
              {errors.text && <span className="text-red-500 text-xs">{errors.text.message}</span>}
          </div>

          <div className="flex justify-between pt-10">
            <button 
              type="button" 
              onClick={onClose} 
              className="border w-[287px] py-2.5 hover:bg-grey-light cursor-pointer transition-colors"
            >
              Відмінити
            </button>
            <button 
              disabled={isLoading}
              type="submit" 
              className="w-[287px] bg-button text-white hover:opacity-90 cursor-pointer disabled:opacity-50 transition-opacity"
            >
              Опублікувати
            </button>
          </div>
        </form>

      </DialogContent>
    </Dialog>
  );
};