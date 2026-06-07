import { useState, useEffect } from "react";

// const SM_MIN = 640;   // min-width: 640px 
const MD_MIN = 768;   // min-width: 768px
const LG_MIN = 1024;  // min-width: 1024px
// const XL_MIN = 1280;  // min-width: 1280px

export const useWindowWidth = () => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setWidth(window.innerWidth);
        }

        const handleResize = () => {
            setWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize);
        }
    },[])
    
    if (width === 0) {
        return { width: 0, isMobile: false, isTablet: false, isDesktop: false };
    }

    const isMobile = width < MD_MIN;
    const isTablet = width >= MD_MIN && width <= LG_MIN; 
    const isDesktop = width > LG_MIN;

    return { 
        width, 
        isMobile, 
        isTablet, 
        isDesktop 
    };
}
 