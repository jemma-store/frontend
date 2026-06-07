import { request } from "@/api/requestService";
import { ApiEndpoint, HttpMethod } from "@/enums";
import { IProductItem, IProducts, ISearchParams, IFilterParams } from "@/types/";

const getAllProducts = async (
  filters: IFilterParams, 
  signal?: AbortSignal 
): Promise<IProducts> => {
    const params: Record<string, any> = {};

    if (filters.page !== undefined) params.page = filters.page;
    if (filters.size !== undefined) params.size = filters.size;
    if (filters.sortBy) params.sortBy = filters.sortBy;
    if (filters.minPrice !== undefined) params.minPrice = filters.minPrice;
    if (filters.maxPrice !== undefined) params.maxPrice = filters.maxPrice;
    if(filters.isNew !==undefined) params.isNew = filters.isNew;

    if (filters.categories && filters.categories.length > 0) {
        params.categories = filters.categories.join(',');
    }

    if (filters.collections && filters.collections.length > 0) {
        params.collections = filters.collections.join(',');
    }
    
    if (filters.materials && filters.materials.length > 0) {
        params.materials = filters.materials.join(',');
    }

  return await request<IProducts>({
    url: ApiEndpoint.PRODUCTS_SEARCH,
    method: HttpMethod.GET,
    params, 
    signal,
});
};

const fetchProductById = async (id: number): Promise<IProductItem> => {
  return await request<IProductItem>({
    url: `${ApiEndpoint.PRODUCTS}/id/${id}`,
    method: HttpMethod.GET,
  });
};

const getProductBySku = async (sku: string): Promise<IProductItem> => {
  return await request<IProductItem>({
    url: `${ApiEndpoint.PRODUCTS}/sku/${sku}`,
    method: HttpMethod.GET,
  });
};

const deleteProductById = async (id: number): Promise<void> => {
  return await request<void>({
    url: `${ApiEndpoint.PRODUCTS}/${id}`,
    method: HttpMethod.DELETE,
  });
};

const getSortedProducts = async (
  page: number,
  sort?: string,
  maxPrice?: number,
  minPrice?: number,
  category?: string[],
  collection?: string[],
  material?: string[]
): Promise<IProducts> => {
  return await request<IProducts>({
    url: ApiEndpoint.PRODUCTS_SORTED,
    method: HttpMethod.POST,
    params: {
      page: page - 1,
      direction: sort,
      minPrice,
      maxPrice,
      material,
    },
    data: {
      categories: category,
      collections: collection,
    }
  });
};

const getSearchProducts = async (
  {
    page,
    size,
    query,
    maxPrice,
    minPrice,
    categories,
    collections,
    materials,
    sortBy
  }: ISearchParams
): Promise<IProducts> => {

  const params : Record<string, any> = {
    page: page - 1,
    size,
    query,
    minPrice,
    maxPrice,
    sortBy,
  }

  if(categories && categories.length > 0 ) {
    params.categories = categories.join(",")
  }
  if(collections && collections.length > 0) {
    params.collections = collections.join(",")
  }
  if(materials && materials.length > 0) {
    params.materials = materials.join(',');
  }

  return await request<IProducts>({
    url: ApiEndpoint.PRODUCTS_SEARCH,
    method: HttpMethod.GET,
    params: params
  });
};

export {
  getAllProducts,
  fetchProductById,
  getProductBySku,
  deleteProductById,
  getSortedProducts,
  getSearchProducts,
}
