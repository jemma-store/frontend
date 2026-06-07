import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { declension } from '@/utils/declension';
import { getQueryParams, setQueryParams } from '@/utils/urlParams';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Slider,
  Checkbox,
  Input,
} from '@/components/ui/';
import { useProductStore, useCatalogStore } from '@/store';
import { FilterIcon } from '@/assets';

export const materials = ['Біле золото', 'Жовте золото', 'Срібло', 'Платина'];

export const Filters = () => {
  const products = useProductStore((state) => state.products);
  const {
    sortBy,
    selectedCategories,
    selectedCollections,
    selectedMaterials,
    priceRange,
    categories,
    collections,
    setSelectedMaterials,
    setPriceRange,
    setPage,
  } = useCatalogStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(priceRange);
  const [inputPriceMin, setInputPriceMin] = useState<string>(priceRange[0].toString());
  const [inputPriceMax, setInputPriceMax] = useState<string>(priceRange[1].toString());

  const handleCheckboxChange = (
    value: string,
    selected: string[],
    setSelected: (val: string[]) => void,
  ) => {
    const updated = selected.includes(value)
      ? selected.filter((v) => v !== value)
      : [...selected, value];
    setSelected(updated);
    setPage(1);
  };

  const handlePriceInputChange = () => {
    const min = parseInt(inputPriceMin, 10);
    const max = parseInt(inputPriceMax, 10);

    if (!isNaN(min) && !isNaN(max) && min <= max) {
      setPriceRange([min, max]);
      setPage(1);

      setSearchParams(
        setQueryParams({
          ...getQueryParams(searchParams),
          minPrice: min,
          maxPrice: max,
          page: 1,
          sortBy: sortBy,
        }),
      );
    }
  };

  const handleCategoryChange = (value: string) => {
    const updated = selectedCategories.includes(value)
      ? selectedCategories.filter((v) => v !== value)
      : [...selectedCategories, value];

    setSearchParams(
      setQueryParams({
        ...getQueryParams(searchParams),
        categories: updated,
        page: 1,
        sortBy,
      }),
    );
  };

  const handleCollectionChange = (value: string) => {
    const updated = selectedCollections.includes(value)
      ? selectedCollections.filter((v) => v !== value)
      : [...selectedCollections, value];

    setSearchParams(
      setQueryParams({
        ...getQueryParams(searchParams),
        collections: updated,
        page: 1,
        sortBy,
      }),
    );
  };

  // const handleMaterialChange = (value: string) => {
  //   const updated = selectedMaterials.includes(value)
  //     ? selectedMaterials.filter((v) => v !== value)
  //     : [...selectedMaterials, value];

  //   setSearchParams(
  //     setQueryParams({
  //       ...getQueryParams(searchParams),
  //       material: updated,
  //       page: 1,
  //       direction: sort,
  //     }),
  //   );
  // };

  return (

    <aside className="flex flex-col gap-8 mr-5 w-full">
      <div className="flex flex-col justify-between">
        
        <div className="flex gap-1 border-1 p-1 md:border-none lg:border-none ">
          <img src={FilterIcon} alt="Filter icon"/>

          <h4 className="font-medium text-[16px] text-brown-dark">Фільтри</h4>
        </div>

        <p className="hidden text-grey lg:block">
          Знайдено <span className="min-w-5">{products.page.totalElements}</span>{' '}
          <span>{declension(products.page.totalElements, ['товар', 'товари', 'товарів'])}</span>
        </p>
      </div>

      <Accordion
        type="multiple"
        className="w-full flex flex-col gap-8 hidden xl:block" 
        defaultValue={['categories', 'collections', 'material', 'price']}
      >
        <AccordionItem value="categories" className="border-none">
          <AccordionTrigger className="p-0 hover:no-underline mb-5 mr-5 justify-between">
            <span className="">Категорії</span>
          </AccordionTrigger>

          <AccordionContent>
            <div className="flex flex-col w-full items-start gap-3">
              {categories.map((category) => (
                <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={selectedCategories.includes(category.name)}
                    onCheckedChange={() =>
                      handleCategoryChange(category.name)
                    }
                  />
                  {category.name}
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="collections" className="border-none">
          <AccordionTrigger className="p-0 hover:no-underline mb-5  mr-5justify-between">
            <span className="">Колекції</span>
          </AccordionTrigger>

          <AccordionContent>
            <div className="flex flex-col w-full items-start gap-3">
              {collections.map((collection) => (
                <label key={collection.id} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={selectedCollections.includes(collection.name)}
                    onCheckedChange={() =>
                      handleCollectionChange(
                        collection.name,
                      )
                    }
                  />
                  {collection.name}
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="material" className="border-none">
          <AccordionTrigger className="p-0 hover:no-underline mb-5 mr-5 justify-between">
            <span className="">Матеріал</span>
          </AccordionTrigger>

          <AccordionContent>
            <div className="flex flex-col w-full items-start gap-3">
              {materials.map((material) => (
                <label key={material} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox
                    checked={selectedMaterials.includes(material)}
                    onCheckedChange={() =>
                      handleCheckboxChange(material, selectedMaterials, setSelectedMaterials)
                    }
                  />
                  {material}
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="price" className="border-none">
          <AccordionTrigger className="p-0 hover:no-underline mb-5 mr-5 justify-between">
            <span className="">Ціна, грн</span>
          </AccordionTrigger>

          <AccordionContent>
            <div className="w-max">
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
                  max={42500}
                  step={25}
                  value={localPriceRange}
                  onValueChange={(val) => {
                    setLocalPriceRange(val as [number, number]);
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
