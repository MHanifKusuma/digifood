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
  description: string;
  price: number;
  menuPhoto: string;
  MenuOptions: IMenuOptions[];
};
