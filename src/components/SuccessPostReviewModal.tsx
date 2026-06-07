import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"

export const SuccessPostReviewModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[450px] text-center p-10">
        <DialogTitle className="text-xl font-bold">Дякуємо!</DialogTitle>
        <p className="py-4">Ваш відгук успішно додано.</p>
        <button 
          onClick={onClose}
          className="w-full bg-black text-white py-2 cursor-pointer"
        >
          Закрити
        </button>
      </DialogContent>
    </Dialog>
  );
};