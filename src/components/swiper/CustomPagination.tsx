import { FC } from 'react';

type CustomPaginationProps = {
  total: number;
  activeIndex: number;
};

export const CustomPagination: FC<CustomPaginationProps> = ({ total, activeIndex }) => {
  return Array.from({ length: total }).map((_, i) => (
    <div
      key={i}
      className={`lg:w-[86px] w-[44px] h-0.5 transition-all duration-300 ${
        i === activeIndex ? 'bg-accent lg:bg-main h-1' : 'bg-grey'
      }`}
    />
  ));
};
