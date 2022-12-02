import { IUserCoupons } from "interfaces/Coupon";
import { IMenu } from "interfaces/Menu";

export interface IUser {
  FullName: string;
  Email: string;
  ProfilePicture: string;
  Phone: string;
  Username: string;
  Role: number;
  UserFavorite: IUserFavorite[];
  UserCoupon: IUserCoupons[];
}

export interface IUserState {
  user: IUser;
  userError: string | null;
}

export interface IUserFavorite {
  Id: number;
  Menu: IMenu[];
}

export interface IUserInfo {
  Id: number;
  Email: string;
  FullName: string;
  Username: string;
}
