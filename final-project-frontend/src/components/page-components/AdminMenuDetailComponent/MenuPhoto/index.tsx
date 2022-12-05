import React from "react";
import AdminMenuDetailPhotoWrapper from "./style";
import defaultImage from "assets/default-image.png";

interface AdminMenuDetailPhotoProp {
  img: string;
}

const AdminMenuDetailPhoto = ({ img }: AdminMenuDetailPhotoProp) => {
  return (
    <AdminMenuDetailPhotoWrapper>
      <img src={img || defaultImage} alt="MenuPhoto" />
    </AdminMenuDetailPhotoWrapper>
  );
};

export default AdminMenuDetailPhoto;
