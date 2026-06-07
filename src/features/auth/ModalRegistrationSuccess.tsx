import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useModalStore } from "@/store";
import { AppRoute } from "@/enums";

export const ModalRegistrationSuccess = () => {
    
    const navigate = useNavigate();
    const close = useModalStore((state) => state.close);

    const handleCloseAndNavigate = () => {
        close()
        navigate(AppRoute.USER_DATA);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            handleCloseAndNavigate();
        },3000)

        return () => {
            clearTimeout(timer);
        }
    },[])

    return(
        <>
            <div 
            className="fixed inset-0 flex items-center justify-center z-50"
            onClick={handleCloseAndNavigate}
            >
                <div className="w-full text-center color-button p-4">
                    <h1 className=" text-[60px] font-medium">РЕЄСТРАЦІЯ УСПІШНА</h1> 
                </div>
            </div>
        </>
    )
}