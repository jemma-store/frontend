import { UploadFileIcon } from "@/admin-panel/icons/UploadFileIcon";
import PlusIcon from "../../icons/PlusIcon";
import { PhotoSquare } from "./PhotoSquare";
import { useProductForm } from "@/admin-panel/hooks/useProductForm";

interface AddPhotoProps {
    id: string;
    isMain: boolean; 
    disable: boolean;
}

export const AddPhoto = ({ id, disable }: AddPhotoProps) => {
    const images = useProductForm((state) => state.formData.images);
    const mainImage = images?.find((img) => img.isMainImage === true);
    const additionalImages = images?.filter((img) => img.isMainImage === false) || [];
    const emptySquaresCount = Math.max(0, 2 - additionalImages.length);

    return (
        <div className="w-[427px]">
            <p className={`${disable ? "text-[#727272]" : ""} text-[20px] mb-6`}>Фотографії товару</p>
            
            <p className={`${disable ? "text-[#727272]" : "text-[#5B242A]"}`}>Головне фото</p>
            <PhotoSquare
                title="Натисніть для завантаження"
                subTitle="PNG, JPG (макс. 5 MB)"
                img={mainImage ? <img src={mainImage.url} alt="Головне фото" className="w-full h-full object-cover" /> : <UploadFileIcon />}
                disable={disable}
                id={`${id}-main`}
                isMain={true}
                hasPhoto={!!mainImage}
                imageUrl={mainImage?.url}
            />

            <p className={`${disable ? "text-[#727272]" : "text-[#5B242A]"} mt-6 mb-3`}>Додаткові фото</p>
            <div className="flex gap-5">
                {additionalImages.map((image, index) => (
                    <PhotoSquare
                        key={index}
                        img={<img src={image.url} alt={`Додаткове фото ${index + 1}`} className="w-full h-full object-cover" />}
                        disable={disable}
                        id={`${id}-extra-${index}`}
                        isMain={false}
                        hasPhoto={true}
                        imageUrl={image.url}
                    />
                ))}
                {Array.from({ length: emptySquaresCount }).map((_, index) => (
                    <PhotoSquare
                        key={`empty-${index}`}
                        img={<PlusIcon />}
                        disable={disable}
                        id={`${id}-extra-new-${index}`}
                        isMain={false}
                        hasPhoto={false}
                    />
                ))}
            </div>
        </div>
    );
};