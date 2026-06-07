import { ICertificateItem } from "../types/";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const filterCertificates = (certificates: ICertificateItem[], filters: any) => {
  let filtered = [...certificates];

  const { priceRange } = filters;

  if (priceRange) {
    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );
  }

  return filtered;
}