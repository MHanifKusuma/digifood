import { IPromotion } from "interfaces/Promotion";

export interface IMenuOptions {
  Id: number;
  Name: string;
  Price: number;
  Type: "radio" | "check";
}

export interface IMenu {
  Id: number;
  Name: string;
  Description: string;
  AverageRating: number;
  TotalFavorites: number;
  TotalReview: number;
  Price: number;
  MenuPhoto: string;
  MenuOptions: IMenuOptions[];
  Promotion: IPromotion;
}

export interface IMenuByCategory {
  Id: number;
  Name: string;
  Menu: IMenu[];
}
