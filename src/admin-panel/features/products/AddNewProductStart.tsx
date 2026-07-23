
import { useProductForm } from "@/admin-panel/hooks/useProductForm"

export const AddNewProductStart = ({disabled} : {disabled : boolean}) => {

    const name = useProductForm((state) => state.formData.name)
    const sku = useProductForm((state) => state.formData.sku);
    const price = useProductForm((state) => state.formData.price.normalPrice)
    const discount = useProductForm((state) => state.formData.price.discountPercentage)
    
    const updateField = useProductForm((state) => state.updateField);

    return (
         <div>
            <section className="flex flex-col gap-2 mt-5">
                <span className={`${disabled ? "text-[#727272]" : "text-[#5B242A]"}`}>Назва товару*</span>
                <input 
                    type="text" 
                    disabled={disabled}
                    value={name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder={`${disabled ? "" : 'Наприклад, Каблучка "Glow"'}`}
                    className={`${disabled ? "text-[#727272] py-4 text-[12px] border-b-2 focus:outline-none " : "py-4 text-[12px] border-b-2 focus:outline-none"}`}

                />
            </section>
            <section className="flex flex-col gap-2 mt-5">
                <span className={`${disabled ? "text-[#727272]" : "text-[#5B242A]"}`}>Артикул*</span>
                <input 
                    type="text" 
                    disabled={disabled}
                    value={sku ?? ""}
                    onChange={(e) => updateField('sku', e.target.value)}
                    placeholder={`${disabled ? "" : "Наприклад, 0025148"}`}
                    className={`${disabled ? "text-[#727272] py-4 text-[12px] border-b-2 focus:outline-none " : "py-4 text-[12px] border-b-2 focus:outline-none"}`}
                />
            </section>
            <section className="flex flex-col gap-2 mt-5">
                <span className={`${disabled ? "text-[#727272]" : "text-[#5B242A]"}`}>Ціна*, грн.</span>
                <input 
                    type="text"
                    disabled={disabled}
                    value={price ?? ""}
                    onChange={(e) => updateField('price.normalPrice', e.target.value)}
                    className={`${disabled ? "text-[#727272] py-4 text-[12px] border-b-2 focus:outline-none " : "py-4 text-[12px] border-b-2 focus:outline-none"}`}

                />
            </section>
            <section className="flex flex-col gap-2 mt-5">
                <span className={`${disabled ? "text-[#727272]" : "text-[#5B242A]"}`}>Відсоток знижки, %</span>
                <input 
                    type="text"
                    disabled={disabled}
                    value={discount ?? ""}
                    onChange={(e) => updateField('price.discountPercentage', e.target.value)}
                    className={`${disabled ? "text-[#727272] py-4 text-[12px] border-b-2 focus:outline-none " : "py-4 text-[12px] border-b-2 focus:outline-none"}`}
                />
            </section>
        </div>
    )
}