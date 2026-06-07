import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';

import { AppRoute } from '@/enums';
import { IProductItem } from '../types/';
import { getSearchProducts } from '@/services';
import { Loader } from './Loader';
import { SearchIcon, X } from '@/assets';

export const SearchDropdown = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<IProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      const trimmed = search.trim();
      if (trimmed.length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const res = await getSearchProducts({
        page: 1,
        size: Infinity,
        query: trimmed,
        maxPrice: undefined,
        minPrice: undefined,
        categories: [],
        collections: [],
        materials: [],
        sortBy: '',
      });
        setResults(res.content);
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
    <div className="fixed lg:top-[100px] top-[80px] lg:h-[50px] h-[40px] left-0 w-full z-50 bg-main border-b-2 border-brown-dark">
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
                <Loader />
              </div>
            ) : results.length === 0 ? (
              <div className="p-4 text-center bg-main">Нічого не знайдено</div>
            ) : (
              results.map((product) => (
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
                  <span>{product.name}</span> <span>{product.collectionName}</span>
                </Link>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
