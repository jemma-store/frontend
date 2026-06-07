import { useEffect, useMemo, useState } from 'react';

import { FilterIcon } from '@/assets';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Slider,
  Input,
} from '@/components/ui/';
import { declension } from '@/utils/declension';
import { useCertificateStore } from '@/store/useCertificateStore';
import { filterCertificates } from '@/utils/filterCertificates';

export const Filters = () => {
  const { certificates, setCertificates } = useCertificateStore();
  const [inputPriceMin, setInputPriceMin] = useState('0');
  const [inputPriceMax, setInputPriceMax] = useState('10000');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);

  const filteredCertificates = useMemo(() => {
    return filterCertificates(certificates, {
      priceRange,
    });
  }, [priceRange, certificates]);

  useEffect(() => {
    setCertificates(filteredCertificates);
  }, [filteredCertificates, setCertificates]);

  const handlePriceInputChange = () => {
    const min = Number(inputPriceMin);
    const max = Number(inputPriceMax);

    if (!isNaN(min) && !isNaN(max) && min <= max) {
      setPriceRange([min, max]);
    }
  };

  return (
    <aside className="w-full flex flex-col gap-8">
      <div className="flex flex-col justify-between">
        <div className="w-full flex flex-row border-1 md:border-none p-2 gap-1">
          <img src={FilterIcon} alt="Filter icon" />

          <h4 className="font-[400] text-[16px] text-brown-dark">Фільтри</h4>
        </div>

        <p className="text-grey hidden md:hidden xl:block">
          Знайдено <span className="min-w-5">{filteredCertificates.length}</span>{' '}
          <span>
            {declension(filteredCertificates.length, ['товар', 'товари', 'товарів'])}
          </span>
        </p>
      </div>

      <Accordion
        type="multiple"
        className="w-full flex flex-col gap-8 hidden xl:block"
        defaultValue={['categories', 'collections', 'material', 'price']}
      >
        <AccordionItem value="price" className="border-none">
          <AccordionTrigger className="p-0 hover:no-underline mb-5">
            <span className="">Ціна, грн</span>
          </AccordionTrigger>

          <AccordionContent>
            <div className=" w-full ">
              <form className="w-full flex flex-col items-start gap-4">
                <div className="w-full flex justify-between items-center gap-1">
                  <Input
                    className="w-[60px] h-[30px] px-1 py-[7px] text-left border border--grey"
                    type="text"
                    name="inputPriceMin"
                    id="inputPriceMin"
                    value={inputPriceMin}
                    onChange={(e) => setInputPriceMin(e.target.value)}
                  />
                  <span>-</span>
                  <Input
                    className="w-[60px] h-[30px] px-1 py-[7px] text-end border border-grey"
                    type="text"
                    name="inputPriceMax"
                    id="inputPriceMax"
                    value={inputPriceMax}
                    onChange={(e) => setInputPriceMax(e.target.value)}
                  />
                  <button
                    className="w-[60px] h-[30px] p-0 btn-buy"
                    type="button"
                    onClick={handlePriceInputChange}
                  >
                    Ok
                  </button>
                </div>

                <Slider
                  name="priceRange"
                  min={0}
                  max={10500}
                  step={500}
                  value={priceRange}
                  onValueChange={(val) => {
                    setPriceRange(val as [number, number]);
                    setInputPriceMin(val[0].toString());
                    setInputPriceMax(val[1].toString());
                  }}
                />
              </form>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};
