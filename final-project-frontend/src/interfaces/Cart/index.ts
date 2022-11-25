import { IMenu } from "interfaces/Menu";

export interface ICartItem {
  menus: IMenu;
  quantity: number;
  option: string;
  price: number;
}

export interface ICart {
  items: ICartItem[];
  totalPrice: number;
}
