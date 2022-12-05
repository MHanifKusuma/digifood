import { IMenuOptions } from "interfaces/Menu";

export type LoginInput = {
  login: string;
  password: string;
};

export type RegisterInput = {
  fullName: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export type SearchInput = {
  name: string;
};

export type ProfileUpdateInput = {
  profilePicture: string;
  fullName: string;
  email: string;
  phone: string;
  username: string;
};

export type MenuCreateUpdateInput = {
  id: number;
  name: string;
  category_id: number;
  description: string;
  price: number;
  menu_photo: string;
  menu_options: IMenuOptions[];
  deleted_menu_options: number[];
};

export type CouponCreateUpdateInput = {
  id: number;
  code: string;
  discount_amount: number;
  available: boolean;
};
