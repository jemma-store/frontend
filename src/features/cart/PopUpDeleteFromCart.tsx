import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';

import {
  useCartStore,
  useModalStore, 
  useGuestCartStore, 
  useUserStore
} from '@/store';

export const PopUpDeleteFromCart = () => {
  const { openModal, deleteProductId, backToCart } = useModalStore();

  const isOpen = openModal === 'deleteFromCart';

const isAuth = useUserStore((state) => !!state.currentUser);

const removeFromAuthCart = useCartStore((state) => state.removeFromCart);
const removeFromGuestCart = useGuestCartStore((state) => state.removeFromCart);

const handleRemove = async () => {
  if (deleteProductId !== null) {
    try {
      if (isAuth) {
        await removeFromAuthCart(deleteProductId);
      } else {
        await removeFromGuestCart(deleteProductId);
      }
      
      backToCart();
    } catch (error) {
      console.error("Помилка при видаленні:", error);
    }
  }
};

  return (
    <Dialog open={isOpen} onOpenChange={() => backToCart()}>
      <DialogTrigger className="hidden" />
      <DialogContent className="!max-w-[363px] z-[9955] flex flex-col items-center gap-7 p-7 !shadow-main">
        <DialogTitle className="w-[250px] text-center text-text font-[500] font-main">
          Ви впевнені, що хочете видалити товар з кошика?
        </DialogTitle>

        <DialogDescription className="hidden" />

       <DialogFooter className="w-full pointer-events-auto relative z-50"> {/* Додали pointer-events-auto */}
        <div className="flex items-center justify-between gap-5 pointer-events-auto">
          <Button 
            variant="outline" 
            className="w-[143px] pointer-events-auto" 
            onClick={() => {
              backToCart();
            }}
          >
            Ні
          </Button>
          <Button 
            className="w-[143px] pointer-events-auto" 
            onClick={() => {
              handleRemove();
            }}
          >
            Так
          </Button>
         </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
