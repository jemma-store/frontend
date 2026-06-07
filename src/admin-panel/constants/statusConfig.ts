export const STATUS_CONFIG = {
    PENDING: {
        title : "В обробці",
        bgColor : "bg-[#D1FBFF]",
        hover : "hover:bg-[#D1FBFF]"
    },
    NEW: {
        title : "Нове",
        bgColor : "bg-[#FFFCAA]",
        hover : "hover:bg-[#FFFCAA]"
    },
    SENDED : {
        title : "Відправлено",
        bgColor : "bg-[#D1D1FF]",
        hover : "hover:bg-[#D1D1FF]"
    },
    DONE : {
        title : "Виконано",
        bgColor : "bg-[#D1FFD9]",
        hover : "hover:bg-[#D1FFD9]"
    },
    CANCELED : {
        title : "Скасовано",
        bgColor : "bg-[#FFD1DB]",
        hover : "hover:bg-[#FFD1DB]"
    } 
} as const;

export type OrderStatusType = keyof typeof STATUS_CONFIG;

    
