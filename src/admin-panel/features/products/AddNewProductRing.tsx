import { SelectDropdown } from "@/admin-panel/components/SelectDropdown"
import { FILTER_BY_METAL, FILTER_BY_STONE } from "@/admin-panel/constants/filterByDate"
import { useProductForm } from "@/admin-panel/hooks/useProductForm"
import PlusIcon from "@/admin-panel/icons/PlusIcon"
import { EnableSizeAndQuantity } from "./EnableSizeAndQuantity"
import { useState, useEffect } from "react"

export const AddNewProductRing = () => {

    const category = useProductForm((state) => state.formData.categoryName);
    
    const typeOfMetal = useProductForm((state) => state.formData.description.characteristic.metal);
    const stones = useProductForm((state) => state.formData.description.characteristic.stones) || [""];
    const weight = useProductForm((state) => state.formData.description.characteristic.averageWeight);
    const width = useProductForm((state) => state.formData.description.characteristic.size.width);
    const updateField = useProductForm((state) => state.updateField);

    const getInitialSizes = (currentCategory: string) => {
        if (currentCategory === "Ланцюжки") {
            return [
                { size: 45, isActive: false, quantity: "" },
                { size: 50, isActive: false, quantity: "" },
                { size: 60, isActive: false, quantity: "" },
            ];
        }
        return [
            { size: 16, isActive: false, quantity: "" },
            { size: 16.5, isActive: false, quantity: "" },
            { size: 17.0, isActive: false, quantity: "" },
            { size: 17.5, isActive: false, quantity: "" },
            { size: 18.0, isActive: false, quantity: "" },
            { size: 18.5, isActive: false, quantity: "" },
            { size: 19.0, isActive: false, quantity: "" },
            { size: 19.5, isActive: false, quantity: "" },
        ];
    };

    const [sizes, setSizes] = useState(() => getInitialSizes(category));

    useEffect(() => {
        setSizes(getInitialSizes(category));
    }, [category]);

    const updateQuantity = (index: number, val: string) => {
        const newSizes = sizes.map((item, i) => {
            if (i === index) {
                return { ...item, quantity: val };
            }
            return item; 
        });
        setSizes(newSizes); 
    };

    const toggleSize = (index: number) => {
        const newSizes = sizes.map((item, i) => {
            if (i === index) {
                return { ...item, isActive: !item.isActive }; 
            }
            return item;
        });
        setSizes(newSizes);
    };

    const handleStoneChange = (index: number, value: string) => {
        const newStones = [...stones];
        newStones[index] = value;
        updateField('description.characteristic.stones', newStones);
    };

    const addStoneField = () => {
        updateField('description.characteristic.stones', [...stones, ""]);
    };

    return (
        <div className="w-full">
            <div className="grid grid-cols-2 pt-2 gap-15 w-full">
                <section className="flex flex-col gap-2 w-full">
                    <span className="text-[#5B242A]">Метал*</span>
                    <SelectDropdown
                        options={FILTER_BY_METAL}
                        onChange={(val) => updateField('description.characteristic.metal', val)}
                        value={typeOfMetal}
                        placeholder="Оберіть вид металу"
                    />
                </section>
                {category !== "Ланцюжки" && (
                    <section className="flex flex-col gap-2 w-full">
                        <div className="flex justify-between">
                            <span className="text-[#5B242A]">Камінь</span>
                            <div className="pr-3.5" onClick={addStoneField}>
                                <PlusIcon className="w-[15px] h-[15px] cursor-pointer hover:scale-110 transition-transform" />
                            </div>
                        </div>
                        {stones.map((stoneValue, index) => (
                            <SelectDropdown
                                key={index}
                                options={FILTER_BY_STONE}
                                onChange={(val) => handleStoneChange(index, val)}
                                value={stoneValue}
                                placeholder="Оберіть камінь"
                            />
                        ))}
                    </section>
                )}
            </div>
            
            <div className="flex flex-row gap-15 mt-5 mb-16">
                <section className="flex flex-col gap-2 w-full">
                    <span className="text-[#5B242A]">Середня вага*, г ~</span>
                    <input 
                        type="text" 
                        value={weight ?? ""}
                        onChange={(e) => updateField('description.characteristic.averageWeight', e.target.value)}
                        className="py-4 text-[12px] border-b-2 focus:outline-none"
                    />
                </section>
                {category === "Ланцюжки" && (
                    <section className="flex flex-col gap-2 w-full">
                        <span className="text-[#5B242A]">Ширина*, мм</span>
                        <input 
                            type="text" 
                            value={width ?? ""} 
                            onChange={(e) => updateField('description.characteristic.width', e.target.value)}
                            className="py-4 text-[12px] border-b-2 focus:outline-none"
                        />
                    </section>
                )}
            </div>

            <p className="mt-12 mb-7 text-[20px]">Доступні розміри та кількість*</p>

            <div className="grid grid-cols-2 gap-x-15 gap-y-7">
                {sizes.map((item, index) => (
                    <EnableSizeAndQuantity  
                        key={item.size}
                        text={item.size}
                        isActive={item.isActive}
                        quantity={item.quantity}
                        onClick={() => toggleSize(index)}
                        refreshQuantity={(val) => updateQuantity(index, val)}
                    />
                ))}
            </div>
        </div>
    )
}