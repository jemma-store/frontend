import { ICartItem } from "./cart";
import { IFullOrderDetails } from "./orderDetails";

export interface IUserItem {
  id: number;
  email?: string;
  firstName: string;
  lastName: string;
  role?: string;
  status?: string;
  gender?: string;
  phone?: string;
  secondaryPhone?: string;
  birthdate?: string;
  address?: {
    city?: string;
    street?: string;
    houseNumber?: string;
    flat?: string;
    department?: string;
    addressLine?: string;
  };
  password?: string;
  orders?: IFullOrderDetails[];
  cart?: ICartItem[];
}