export interface ISearchParams {
  page: number;
  size: number;
  query?: string;
  maxPrice?: number;
  minPrice?: number;
  categories?: string[];
  collections?: string[];
  materials?: string[];
  sortBy?: string;
}