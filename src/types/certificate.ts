export interface ICertificateItem {
  id: number;
  name: string;
  price: number;
  image: string;
  sku: number;
  description1: string;
  description2: string;
  description3: {
    chapter1 : string,
    chapter2 : string,
    chapter3 : string,
    chapter4 : string,
    chapter5 : string,
    chapter6 : string,
    chapter7 : string,
    chapter8 : string,
  };
};