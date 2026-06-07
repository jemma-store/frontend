import { useState } from "react"
import axiosInstance from "@/api/axiosInstance"
import { useProductForm } from "@/admin-panel/hooks/useProductForm"
import { AddNewProductStart } from "./AddNewProductStart"
import { SelectDropdown } from "@/admin-panel/components/SelectDropdown"
import { FILTER_BY_CATEGORY, FILTER_BY_COLLECTION } from "@/admin-panel/constants/filterByDate"
import { AddPhoto } from "./AddPhoto"
import { Checkbox } from "@/components/ui"
import { AddNewProductRing } from "./AddNewProductRing"
import { AddNewProductSerezhki } from "./AddNewProductSerezhki"
import { createProductService } from "@/admin-panel/services/productService"
import { saveAsDraftService } from "@/admin-panel/services/DraftsServices"
import { prepareProductPayload } from "@/utils/prepareProductPayload"

interface AddNewProductProps {
    disabled : boolean;
}

export const AddNewProduct = ({disabled} : AddNewProductProps) => {
    const formData = useProductForm((state) => state.formData);
    const updateField = useProductForm((state) => state.updateField);
    const id = useProductForm((state) => state.formData.id);
    const resetForm = useProductForm((state) => state.resetForm); // 👈 Витягуємо функцію очищення
    
    const [isLoading, setIsLoading] = useState(false);

    const category = formData.categoryName;
    const collection = formData.collectionName;
    const isNew = formData.isNew;

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const payload = prepareProductPayload(formData, "PUBLISHED", id);
            const createdProduct = await createProductService(payload);
            const newProductId = createdProduct.id;
            
            console.log("Створено товар з ID:", newProductId);

            for (const image of formData.images) {
                if (!image.file) continue; 

                const imageForm = new FormData();
                imageForm.append("file", image.file); 
                imageForm.append("productId", String(newProductId));
                imageForm.append("isMain", String(image.isMainImage));

                await axiosInstance.post("/api/images/upload", imageForm, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
            }
            console.log("Товар та фото успішно відправлені на сервер");
            alert("✅ Товар успішно додано!");
            resetForm();

        } catch (error) {
            console.error(error);
            alert("❌ Сталася помилка. Перевір консоль.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveDraft = async () => {
        try {
            const payload = prepareProductPayload(formData, "DRAFT", id);
            const result = await saveAsDraftService(id, payload);
            return result;
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <div className="pl-5 grid grid-cols-[1fr_1fr] gap-x-[100px] gap-y-12">
            <div>
                <h3 className="pl-2 mt-5">Новий товар</h3>
                <p className="mt-12 mb-7 text-[20px]">Основна інформація</p>
                <div>
                    <div className="flex flex-row pt-2 gap-15 w-full">
                        <section className="flex flex-col gap-2 w-full">
                            <span className="text-[#5B242A]">Категорія*</span>
                            <SelectDropdown
                                options={FILTER_BY_CATEGORY}
                                onChange={(val) => updateField('categoryName', val)}
                                value={category}
                                placeholder="Оберіть категорію"
                            />
                        </section>
                        <section className="flex flex-col gap-2 w-full">
                            <span className={!category ? "text-[#727272]" : "text-[#5B242A]"}>Колекція*</span>
                                <SelectDropdown
                                    options={FILTER_BY_COLLECTION}
                                    onChange={(val) => updateField('collectionName', val)}
                                    value={collection}
                                    placeholder="Оберіть колекцію"
                                    disable={!category}
                                    
                                />
                        </section>
                    </div>
                    {!category ? (
                        <div>
                            <AddNewProductStart disabled={true}/>
                        </div>
                    ):(
                        <div>
                            <AddNewProductStart disabled={false} />
                             <section className="flex flex-row mt-8 gap-3 w-full">
                                <Checkbox
                                    checked={isNew}
                                    onCheckedChange={(checked: boolean) => updateField('isNew', checked)}
                                />
                                <span className="text-[#5B242A]">Новинка</span>
                            </section>
                            <p className="mt-12 mb-7 text-[20px]">Характеристики</p>
                        </div>
                    )}
                    
                    {(category === "Каблучки" || category === "Ланцюжки") && (
                        <AddNewProductRing/>
                    )}

                    {(category === "Сережки" || category === "Підвіски" || category === "Браслети") && (
                        <AddNewProductSerezhki/>
                    )}
                </div>
            <button className="bg-[#5B242A] text-white w-[190px] h-[30px] mt-16 cursor-pointer">Імпортувати з Excel</button>

            </div>
            <div className="pb-5 mt-[116px]">
               <AddPhoto
                    id="main-photo"
                    isMain={true}
                    disable={!category}
               />
            </div>
            <div>
                {/* не видаляти. потірбно для гріда */}
            </div>

            {category ? (
                <div className=" flex flex-col  pb-[138px]">
                    <div className="flex gap-5">
                        <button className={`${disabled 
                        ? "text-[#727272] cursor-default" 
                        : "cursor-pointer"} 
                        border py-2.5 w-[204px] `}
                        >
                            Скасувати
                        </button>
                        <button 
                            onClick={handleSubmit}
                            disabled={disabled || isLoading}
                            className={`${disabled || isLoading
                                ? "text-white bg-[#727272] border-[#727272] cursor-default" 
                                : "text-white bg-button cursor-pointer"} 
                                border py-2.5 w-[204px]`}
                        >
                            {isLoading ? "Завантаження..." : "Додати товар"}
                        </button>
                    </div>
                    <button className={`${disabled 
                        ? "text-[#727272] cursor-default" 
                        : " cursor-pointer"} 
                        border py-2.5 w-[427px] mt-7`}
                        onClick={handleSaveDraft}
                        
                    >
                        Зберегти як чернетку
                    </button>
                </div>
            ):
            ( <div className="pt-12">
                <div className="flex gap-5">
                    <button className={`${!disabled 
                    ? "text-[#727272] cursor-default" 
                    : "cursor-pointer"} 
                    border py-2.5 w-[204px] `}
                    >
                        Скасувати
                    </button>
                    <button className={`${!disabled 
                        ? "text-white bg-[#727272] border-[#727272] cursor-default" 
                        : "text-white bg-button cursor-pointer"} 
                        border py-2.5 w-[204px]`}
                    >
                        Додати товар
                    </button>
                </div>
                <button className={`${!disabled 
                    ? "text-[#727272] cursor-default" 
                    : " cursor-pointer"} 
                    border py-2.5 w-[427px] mt-7 mb-[240px]`}
                >
                    Зберегти як чернетку
                </button>
            </div>)
            }
        </div>
    )
}