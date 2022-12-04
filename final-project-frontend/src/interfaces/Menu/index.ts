import { IPromotion } from "interfaces/Promotion";

export interface IMenuOptions {
  Id: number;
  Name: string;
  Price: number;
  MenuId: number;
  Type: "radio" | "check";
}

export interface IMenu {
  Id: number;
  Name: string;
  CategoryId: number;
  Description: string;
  AverageRating: number;
  TotalFavorites: number;
  TotalReview: number;
  Price: number;
  MenuPhoto: string;
  MenuOptions: IMenuOptions[];
  Promotion: IPromotion;
}

export interface IMenuPagination {
  data: IMenu[];
  current_page: number;
  total: number;
  total_page: number;
}

export interface IMenuByCategory {
  Id: number;
  Name: string;
  Menu: IMenu[];
}
