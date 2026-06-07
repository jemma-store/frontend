import cn from 'classnames';
import { ChevronRight } from '@/assets';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onChange }: PaginationProps) => {

  if (totalPages <= 1) return null;

  return (
    <div className="w-full flex items-center justify-center h-7 mb-5 mt-5">
      <div className="min-w-[541px] flex items-center justify-between gap-2">
        <button
          className={cn(
            'btn hover:text-accent transition-all duration-300',
            currentPage === 1 && 'cursor-default text-grey hover:text-grey'
          )}
          onClick={() => onChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronRight classname="w-5 h-5 transform rotate-180" />
        </button>
        <div className="flex items-center flex-row gap-3">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => onChange(p)}
              className={cn(
                'w-7 h-7 px-[10.5px] py-[3.5px] border-[0.5px] border-solid cursor-pointer flex items-center justify-center hover:border-brown-dark hover:text-accent transition-all duration-300',
                currentPage === p ? 'border-brown-dark' : 'border-transparent'
              )}
            >
              {p}
            </button>
          ))}
        </div>
        <button
          className={cn(
            'btn hover:text-accent transition-all duration-300',
            currentPage === totalPages && 'cursor-default text-grey hover:text-grey'
          )}
          onClick={() => onChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight classname="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};