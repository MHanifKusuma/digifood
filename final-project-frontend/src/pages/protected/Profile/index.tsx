import ProfileContent, {
  ProfileContentNavItem,
} from "components/page-components/ProfileComponent/ProfileContent";
import ProfileNavbar from "components/page-components/ProfileComponent/ProfileNavbar";
import Navbar from "components/shared-components/Navbar";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/reducers";
import ProfileWrapper from "./style";

const Profile = () => {
  const { user } = useSelector((state: RootState) => state.UsersReducer);

  const [activeProfileContent, setActiveProfileContent] = useState(
    ProfileContentNavItem.MY_PROFILE
  );
  return (
    <ProfileWrapper>
      <Navbar />
      <div className="container py-5">
        <ProfileNavbar
          setActiveContent={setActiveProfileContent}
          activeContent={activeProfileContent}
        />
        <h1>Hello, {user.FullName}!</h1>
        <ProfileContent activeNav={activeProfileContent} user={user} />
      </div>
    </ProfileWrapper>
  );
};

export default Profile;
