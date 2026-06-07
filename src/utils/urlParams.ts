import { IFilterParams } from "../types/";

export const getQueryParams = (searchParams: URLSearchParams): IFilterParams => {

  const parseArray = (key: string): string[] => {
    const val = searchParams.get(key);
    if (!val) return [];
    try {
      return val.replace(/^\[|\]$/g, '').split(',').filter(Boolean);
    } catch {
      return [];
    }
  };


  const getNumber = (key: string): number | undefined => {
    const val = searchParams.get(key);
    return val ? Number(val) : undefined;
  };

  return {
    page: getNumber('page'),
    size: getNumber('size'),
    query: searchParams.get('query') || undefined,
    minPrice: getNumber('minPrice'),
    maxPrice: getNumber('maxPrice'),
    categories: parseArray('categories'),
    collections: parseArray('collections'),
    materials: parseArray('materials'),
    sortBy: searchParams.get('sortBy') || undefined,
    isNew: searchParams.get('isNew') === 'true',
  };
};

export const setQueryParams = (params: IFilterParams): string => {
  const searchParams = new URLSearchParams();

  const addArrayAsStringifiedList = (key: string, values?: string[]) => {
    if (values && values.length > 0) {
      searchParams.set(key, `[${values.join(',')}]`);
    }
  };

  const addNumber = (key: string, value?: number) => {
    if (value !== undefined && !isNaN(value)) {
      searchParams.set(key, value.toString());
    }
  };

  addArrayAsStringifiedList('categories', params.categories);
  addArrayAsStringifiedList('collections', params.collections);
  addArrayAsStringifiedList('material', params.materials);

  if (params.sortBy) searchParams.set('sort', params.sortBy);
  addNumber('page', params.page);
  addNumber('size', params.size);
  addNumber('minPrice', params.minPrice);
  addNumber('maxPrice', params.maxPrice);

  if (params.isNew) searchParams.set('isNew', 'true');

  return `?${searchParams.toString()}`;
};
