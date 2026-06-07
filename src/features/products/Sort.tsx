import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import cn from 'classnames';

import { sortOptions } from '@/mock';
import { useCatalogStore } from '@/store';
import { setQueryParams } from '@/utils/urlParams';
import { ArrowDownIcon, SortIcon } from '@/assets';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui';

export const Sort = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [, setSearchParams] = useSearchParams();
  const {
    selectedCategories,
    selectedCollections,
    selectedMaterials,
    priceRange,
    sortBy,
  } = useCatalogStore();

  const selectedSort = sortOptions.find((opt) => opt.value === sortBy);

  const handleSortChange = (value: string) => {
    useCatalogStore.getState().setSort(value);
    useCatalogStore.getState().setPage(1);

    setSearchParams(
      setQueryParams({
        page: 1,
        sortBy: value,
        categories: selectedCategories,
        collections: selectedCollections,
        materials: selectedMaterials,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
      }),
    );

    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="border-1 p-1 gap-1 w-full flex cursor-pointer text-[16px] font-medium align-center md:border-none lg:border-none lg:gap-5">
        <SortIcon />
        {selectedSort ? selectedSort.label : 'За популярністю'}
        <ArrowDownIcon
          classname={cn('w-5 h-5 transition-transform duration-300 hidden md:ml-5 md:block lg:block', {
            'rotate-180': isOpen,
          })}
        />
      </PopoverTrigger>

      <PopoverContent className="relative top-2 z-1000 w-[280px] min-h-[170px] p-0 m-0 bg-main flex flex-col text-start">
        {sortOptions.map((opt) => (
          <div
            className={
              cn(opt.value === sortBy && 'bg-button text-main ') +
              'px-9 py-3 cursor-pointer w-full hover:bg-accent'
            }
            onClick={() => handleSortChange(opt.value)}
            key={opt.value}
          >
            {opt.label}
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
};
