interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  confirmText : string;
  cancelText : string;
  onClose: () => void;
  onConfirm: () => void;
}

export const ConfirmationModal = ({onClose, onConfirm, title, cancelText, confirmText} : ConfirmationModalProps) => {
    return (
       <div className="flex flex-col fixed inset-0 z-50  items-center justify-center bg-black/50 backdrop-blur-sm px-4 ">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md flex flex-col text-center border border-gray-100">
                <h3 className="text-[16px]">{title}</h3>
                <div className="flex gap-10 m-auto items-baseline">
                    <button 
                    className=" mt-5 p-2 rounded-[5px] bg-[#5B242A] text-white cursor-pointer hover:opacity-75"
                    onClick={onConfirm}
                >
                    {confirmText}
                </button>
                <button
                    className="border-1 p-2 rounded-[5px] cursor-pointer hover:opacity-75 "
                    onClick={onClose}
                >
                    {cancelText}
                </button>
                </div>
            </div>
        </div>
    )
}