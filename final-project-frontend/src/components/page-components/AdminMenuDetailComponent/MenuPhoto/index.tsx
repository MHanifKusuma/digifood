import React from "react";
import AdminMenuDetailPhotoWrapper from "./style";

interface AdminMenuDetailPhotoProp {
  img: string;
}

const AdminMenuDetailPhoto = ({ img }: AdminMenuDetailPhotoProp) => {
  return (
    <AdminMenuDetailPhotoWrapper>
      <img src={img} alt="MenuPhoto" />
    </AdminMenuDetailPhotoWrapper>
  );
};

export default AdminMenuDetailPhoto;
