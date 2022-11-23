import { IMenuByCategory } from "interfaces/Menu";
import React, { useState } from "react";
import OurMenuWrapper, { CategoryWrapper, MenuWrapper } from "./style";
import Logo from "assets/logo.webp";
import MenuCard from "components/shared-components/MenuCard";
import Button from "components/shared-components/Button";

interface OurMenuProps {
  categories: IMenuByCategory[];
}

const OurMenu = ({ categories }: OurMenuProps) => {
  const [activeCategory, setActiveCategory] = useState(1);

  return (
    <OurMenuWrapper>
      <div className="container py-5">
        <h1 className="text-center">Our Menu</h1>

        <CategoryWrapper>
          {categories.map((category) => (
            <div
              className={`px-3 my-2 col-lg-2 d-flex flex-column align-items-center`}
              key={category.Id}
            >
              <div
                className={`cat-image ${
                  category.Id === activeCategory ? "active-cat" : ""
                }`}
                onClick={() => setActiveCategory(category.Id)}
                role="button"
              >
                <img src={Logo} alt="" />
              </div>
              <p
                className="text-center"
                onClick={() => setActiveCategory(category.Id)}
                role="button"
              >
                {category.Name}
              </p>
            </div>
          ))}
        </CategoryWrapper>
        <MenuWrapper>
          {categories.map((category) => (
            <>
              {category.Id === activeCategory && (
                <div className="d-flex flex-wrap">
                  {category.Menu.map((menu) => (
                    <div className="col-12 col-lg-3" key={menu.Id}>
                      <MenuCard menu={menu} />
                    </div>
                  ))}
                </div>
              )}
            </>
          ))}
          <Button
            btnStyle={{
              backgroundColor: "#aad4b3",
              color: "#ffffff",
              padding: "0.5rem 4rem",
              marginTop: "1.5rem",
            }}
          >
            See all Menu
          </Button>
        </MenuWrapper>
      </div>
    </OurMenuWrapper>
  );
};

export default OurMenu;
