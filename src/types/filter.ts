export interface IFilterParams {
  page?: number;
  size?: number;
  query?: string;
  minPrice?: number;
  maxPrice?: number;
  categories?: string[];
  collections?: string[];
  materials?: string[];
  sortBy?: string;
  isNew?: boolean;
};