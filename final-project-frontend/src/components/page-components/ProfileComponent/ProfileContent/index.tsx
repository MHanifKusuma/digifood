import { IUser } from "interfaces/User";
import React from "react";
import UserCoupon from "./UserCoupon";
import UserProfile from "./UserProfile";

export enum ProfileContentNavItem {
  MY_PROFILE = "nav-1",
  MY_COUPONS = "nav-2",
}

interface ProfileContentProp {
  activeNav: ProfileContentNavItem;
  user: IUser;
}

const ProfileContent = ({ activeNav, user }: ProfileContentProp) => {
  switch (activeNav) {
    case ProfileContentNavItem.MY_PROFILE:
      return <UserProfile user={user} />;
    case ProfileContentNavItem.MY_COUPONS:
      return <UserCoupon />;
    default:
      return <UserProfile user={user} />;
  }
};

export default ProfileContent;
