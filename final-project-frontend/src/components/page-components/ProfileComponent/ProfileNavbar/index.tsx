import React, { Dispatch, SetStateAction, useState } from "react";
import { ProfileContentNavItem } from "../ProfileContent";
import ProfileNavbarWrapper from "./style";

interface ProfileNavbarProp {
  setActiveContent: Dispatch<SetStateAction<ProfileContentNavItem>>;
  activeContent: ProfileContentNavItem;
}

const ProfileNavbar = ({
  setActiveContent,
  activeContent,
}: ProfileNavbarProp) => {
  return (
    <ProfileNavbarWrapper>
      <div className="row justify-content-center">
        <div
          className={`col-6 col-lg-2 nav-item`}
          role="button"
          onClick={() => setActiveContent(ProfileContentNavItem.MY_PROFILE)}
        >
          <p
            id="nav-1"
            className={
              activeContent === ProfileContentNavItem.MY_PROFILE ? "active" : ""
            }
          >
            My Profile
          </p>
        </div>
        <div
          className={`col-6 col-lg-2 nav-item`}
          role="button"
          onClick={() => setActiveContent(ProfileContentNavItem.MY_COUPONS)}
        >
          <p
            id="nav-2"
            className={
              activeContent === ProfileContentNavItem.MY_COUPONS ? "active" : ""
            }
          >
            My Coupons
          </p>
        </div>
      </div>
    </ProfileNavbarWrapper>
  );
};

export default ProfileNavbar;
