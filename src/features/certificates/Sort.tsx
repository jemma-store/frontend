import { FC, useState } from 'react';
import cn from 'classnames';

import { sortOptions } from '@/mock';
import { useCatalogStore } from '@/store';
import { ArrowDownIcon, SortIcon } from '@/assets';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui';

interface ISortProps {
  sort: string;
  setSort: (sort: string) => void;
}

export const Sort: FC<ISortProps> = ({ sort, setSort }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedSortName = useCatalogStore((state) => state.sortBy);

  const selectedSort = Object.values(sortOptions).find((s) => s.value === sort)?.label;

  const handleSortChange = (value: string) => {
    setSort(value);

    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger className="border-1 w-full flex items-center gap-1 p-2 font-[400] text-[16px] cursor-pointer  target:border-b-2 target:border-button md:border-none xl:mb-5">
        <SortIcon />
        {selectedSort ? selectedSort : 'За популярністю'}
        <ArrowDownIcon
          classname={cn('hidden w-5 h-5 md:block transition-transform duration-300', {
            'rotate-180': isOpen,
          })}
        />
      </PopoverTrigger>

      <PopoverContent className="relative top-2 z-1000 w-[280px] min-h-[170px] p-0 m-0 bg-main flex flex-col text-start">
        {sortOptions.map((opt) => (
          <div
            className={
              cn(opt.value === selectedSortName && 'bg-button text-main ') +
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
