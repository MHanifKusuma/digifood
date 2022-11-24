import React from "react";
import MenuDetailPhotoWrapper from "./style";

interface MenuDetailPhotoProps {
  photo: string;
}

const MenuDetailPhoto = ({ photo }: MenuDetailPhotoProps) => {
  return (
    <MenuDetailPhotoWrapper className="pt-5 p-lg-5">
      <img src={photo} />
    </MenuDetailPhotoWrapper>
  );
};

export default MenuDetailPhoto;
