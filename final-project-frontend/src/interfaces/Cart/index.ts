import { IMenu } from "interfaces/Menu";

export interface ICartItem {
  menus: IMenu;
  MenuId: number;
  Quantity: number;
  AddOns: string;
  Price: number;
}

export interface ICart {
  items: ICartItem[];
  totalPrice: number;
}
