import React from 'react';
import { DeleteIcon } from "@/assets";
import { useProductForm } from '@/admin-panel/hooks/useProductForm';


interface PhotoSquareProps {
    title?: string;
    subTitle?: string;
    img: React.ReactNode;
    disable: boolean;
    id: string;
    isMain: boolean;
    hasPhoto?: boolean;
    imageUrl? : string;
}

export const PhotoSquare = ({ title, subTitle, img, disable, id, isMain, hasPhoto, imageUrl}: PhotoSquareProps) => {

    const sizeClasses = {
        main: "w-[427px] h-[407px]",
        extra: "w-[204px] h-[204px]"
    };

    const removeImage = useProductForm((state) => state.removeImage);
    const addImage = useProductForm((state) => state.addImage)

    const handleFileChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const previewUrl = URL.createObjectURL(file);
            addImage({
                url : previewUrl,
                isMainImage : isMain,
                file : file,
            })
        e.target.value = '';
        }
    }

    return (
        <label
            htmlFor={id}
            className={`${disable ? "text-[#727272] cursor-default" : "cursor-pointer"} 
                ${sizeClasses[isMain ? 'main' : 'extra']}
                ${hasPhoto ? "border-solid border-transparent" : "border-dashed border-[1px] border-[#727272]"} 
                flex flex-col mt-3 overflow-hidden rounded-md relative`}
        >
            <div className="flex flex-col m-auto text-center items-center justify-center w-full h-full">
                {img}
                {!hasPhoto && (
                    <>
                        <span className={`${disable ? "text-[#727272]" : ""} mt-2`}>{title}</span>
                        <span className={`${disable ? "text-[#727272]" : ""} text-sm`}>{subTitle}</span>
                    </>
                )}
                <input 
                    type="file" 
                    id={id} 
                    className="hidden" 
                    disabled={disable}
                    onChange={handleFileChange}
                />
                {hasPhoto && (
                    <div 
                        className='absolute top-5 right-5 z-10' 
                        onClick={(e) => {
                            e.preventDefault();
                            if (imageUrl) {
                                removeImage(imageUrl);
                            }
                        }}
                    >
                        <DeleteIcon/>
                    </div>
                )}
            </div>
        </label>
    );
}