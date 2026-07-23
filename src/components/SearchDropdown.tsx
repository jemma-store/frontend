import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { searchQueryService } from '@/admin-panel/services/searchFilterService'; 

import { AppRoute } from '@/enums';
import { IProductItem } from '../types/';

import { SearchIcon, X } from '@/assets';

export const SearchDropdown = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<IProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
   const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.closest('.search-toggle-btn')) {
        return;
      }
      
      const isInside = dropdownRef.current?.contains(target as Node);

      if (dropdownRef.current && !isInside) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside, true);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      const trimmed = search.trim();
      if (trimmed.length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const res = await searchQueryService(trimmed, 100, 0, [], []);
        const foundProducts = res?.content || res || [];
        setResults(foundProducts);
        
      } catch (err) {
        console.error('Search error:', err);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  if (!isOpen) return null;

  return (
    <div ref={dropdownRef} className="fixed lg:top-[100px] top-[80px] lg:h-[50px] h-[40px] left-0 w-full z-50 bg-main border-b-2 border-brown-dark">
      <div className="container h-full flex items-center gap-2 ">
        <SearchIcon classname="text-brown-dark" />
        <Input
          placeholder="Що шукаєте?"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-0 border-0 outline-none focus-visible:outline-none focus-visible:border-none focus-visible:shadow-none focus-visible:ring-0"
        />

        <button className="btn" onClick={onClose}>
          <X />
        </button>
      </div>

      {search && (
        <div className="absolute top-full left-0 w-full shadow-main max-h-[300px] overflow-y-auto border mt-2 z-50">
          <div className="container">
            {isLoading ? (
              <div className="p-4 text-center bg-main">
                <span>Пошук...</span>
              </div>
            ) : results.length === 0 ? (
              <div className="p-4 text-center bg-main">Нічого не знайдено</div>
            ) : (
              results?.slice(0, 10).map((product) => (
                <Link
                  key={product.id}
                  to={AppRoute.PRODUCT.replace(':id', product.id.toString())
                    .replace(':category', product.categoryName)
                    .replace(':title', `${product.name} ${product.collectionName}`)}
                  className="bg-main p-4 block hover:bg-accent cursor-pointer"
                  onClick={() => {
                    onClose();
                    setSearch('');
                  }}
                >
                  <div className="flex justify-between">
                    <span>{product.name}</span>
                    <span className="text-gray-500 text-sm">{product.collectionName}</span>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};