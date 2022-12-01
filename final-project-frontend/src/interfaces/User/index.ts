import { IUserCoupons } from "interfaces/Coupon";
import { IMenu } from "interfaces/Menu";

export interface IUser {
  FullName: string;
  Email: string;
  ProfilePicture: string;
  Phone: string;
  Username: string;
  UserFavorite: IUserFavorite[];
  UserCoupon: IUserCoupons[];
}

export interface IUserState {
  user: IUser;
}

export interface IUserFavorite {
  Id: number;
  Menu: IMenu[];
}
