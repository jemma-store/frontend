import { SelectDropdown } from "@/admin-panel/components/SelectDropdown"
import { FILTER_BY_METAL, FILTER_BY_STONE } from "@/admin-panel/constants/filterByDate"
import { useProductForm } from "@/admin-panel/hooks/useProductForm"
import PlusIcon from "@/admin-panel/icons/PlusIcon"

export const AddNewProductSerezhki = () => {
    const typeOfMetal = useProductForm((state) => state.formData.description.characteristic.metal);
    const stones = useProductForm((state) => state.formData.description.characteristic.stones) || [""];
    
    const weight = useProductForm((state) => state.formData.description.characteristic.averageWeight);
    const width = useProductForm((state) => state.formData.description.characteristic.size.width);
    const height = useProductForm((state) => state.formData.description.characteristic.size.height);
    const length = useProductForm((state) => state.formData.description.characteristic.size.length);

    const updateField = useProductForm((state) => state.updateField);

    const handleStoneChange = (index: number, value: string) => {
        const newStones = [...stones];
        newStones[index] = value;
        updateField('description.characteristic.stones', newStones);
    };

    const addStoneField = () => {
        updateField('description.characteristic.stones', [...stones, ""]);
    };

    return (
        <div className="flex flex-col pt-2 gap-7">
            <div className="flex gap-15">
                <section className="flex flex-col gap-2 w-full">
                    <span className="text-[#5B242A]">Метал*</span>
                    <SelectDropdown
                        options={FILTER_BY_METAL}
                        onChange={(val) => updateField('description.characteristic.metal', val)}
                        value={typeOfMetal}
                        placeholder="Оберіть вид металу"
                    />
                </section>
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
            </div>
            
            <div className="grid grid-cols-2 gap-x-15 gap-y-7">
                <section className="flex flex-col gap-2 w-full">
                    <span className="text-[#5B242A]">Середня вага*, г ~</span>
                    <input 
                        type="text" 
                        value={weight ?? ""}
                        onChange={(e) => updateField('description.characteristic.averageWeight', e.target.value)}
                        className="py-4 text-[12px] border-b-2 focus:outline-none"
                    />
                </section>

                <section className="flex flex-col gap-2 w-full">
                    <span className="text-[#5B242A]">Ширина*, мм ~</span>
                    <input 
                        type="text" 
                        value={width ?? ""}
                        onChange={(e) => updateField('description.characteristic.size.width', e.target.value)}
                        className="py-4 text-[12px] border-b-2 focus:outline-none"
                    />
                </section> 

                <section className="flex flex-col gap-2 w-full">
                    <span className="text-[#5B242A]">Висота*, мм ~</span>
                    <input 
                        type="text" 
                        value={height ?? ""}
                        onChange={(e) => updateField('description.characteristic.size.height', e.target.value)}
                        className="py-4 text-[12px] border-b-2 focus:outline-none"
                    />
                </section> 
                
                <section className="flex flex-col gap-2 w-full">
                    <span className="text-[#5B242A]">Довжина*, мм ~</span>
                    <input 
                        type="text" 
                        value={length ?? ""}
                        onChange={(e) => updateField('description.characteristic.size.length', e.target.value)}
                        className="py-4 text-[12px] border-b-2 focus:outline-none"
                    />
                </section>
            </div>
        </div>
    )
}