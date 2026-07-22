export interface FilterOption {
  label: string;
  value: string;
}

export const FILTER_BY_DATA: FilterOption[] = [
  { label: 'За тиждень', value: 'WEEK' },
  { label: 'За місяць', value: 'MONTH' }, 
  { label: 'За квартал', value: 'QUARTER' },
  { label: 'За рік', value: 'YEAR' },
];

export const FILTER_BY_DELIVERY_METHOD : FilterOption[] = [
   { label: 'Курʼєр Нової пошти', value: 'NOVA_POST_COURIER' },
   { label: 'Відділення Нової пошти', value: 'NOVA_POST_DEPARTMENT' },
   { label: 'Поштомат Нової пошти', value: 'NOVA_POST_PARCEL_LOCKER' },
]

export const FILTER_BY_CATEGORY : FilterOption[] = [
  { label: 'Підвіска', value: 'Підвіски' },
  { label: 'Каблучка', value: 'Каблучки' },
  { label: 'Ланцюжок', value: 'Ланцюжки' },
  { label: 'Сережки', value: 'Сережки' },
  { label: 'Браслет', value: 'Браслети' },
]

export const FILTER_BY_COLLECTION  : FilterOption[] = [
  { label: 'Moon', value: 'Moon' },
  { label: 'Heart', value: 'Heart' },
  { label: 'Sun', value: 'Sun' },
  { label: 'Snow', value: 'Snow' },
  { label: 'Ocean', value: 'Ocean' },
  { label: 'Spark', value: 'Spark' },
  { label: 'Glow', value: 'Glow' },
];

export const FILTER_BY_METAL : FilterOption[] = [
  {label : "Біле золото", value : "WHITE_GOLD"},
  {label : "Жовте золото", value : "YELOW_GOLD"},
  {label : "Срібло", value : "SILVER"},
  {label : "Платина", value : "PLATINUM"},
];

export const FILTER_BY_STONE : FilterOption[] = [
  {label : "Фіаніт", value : "PHIANIT"},
  {label : "Сапфір", value : "SAPFIR"},
  {label : "Діамант", value : "DIAMOND"},
];
