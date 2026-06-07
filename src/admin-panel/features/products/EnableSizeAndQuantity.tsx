interface EnableSizeAndQuantityProps {
    text : number;
    isActive : boolean;
    quantity: string;
    onClick: () => void;
    refreshQuantity : (value : string) => void;
}

export const EnableSizeAndQuantity = ({text, isActive, onClick, refreshQuantity, quantity} : EnableSizeAndQuantityProps) => {

    return (
        <div className="flex flex-col" >
            <div 
                className={`${isActive ? "bg-[#A76F53]" : "bg-white"} px-18 text-center py-2 cursor-pointer`} 
                onClick={onClick}
            >
                {text}
            </div>
            {isActive ? (
                 <div className="flex justify-between gap-5 mt-3">
                    <span className="text-button ">Кількість</span>
                    <input 
                        type="text" 
                        className="border-b-2 w-full focus:outline-none"
                        onChange={(e) => refreshQuantity(e.target.value)}
                        value={quantity}
                    />
                </div>
            ) : null}
        </div>
    )
}