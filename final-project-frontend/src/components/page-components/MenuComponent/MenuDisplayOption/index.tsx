import Button from "components/shared-components/Button";
import { ICategory } from "interfaces/Category";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "redux/reducers";
import MenuDisplayOptionWrapper from "./style";

interface MenuDisplayOptionProps {
  handleSortChange: (e: React.FormEvent<HTMLSelectElement>) => void;
  handleOrderChange: (e: React.FormEvent<HTMLSelectElement>) => void;
  handleFilterChange: (e: React.FormEvent<HTMLSelectElement>) => void;
  categories: ICategory[];
}

const MenuDisplayOption = ({
  handleFilterChange,
  handleOrderChange,
  handleSortChange,
  categories,
}: MenuDisplayOptionProps) => {
  const sortOption = [
    { label: "Rating", value: "rating" },
    { label: "Price", value: "price" },
  ];

  const orderOption = [
    { label: "Highest to Lowest", value: "desc" },
    { label: "Lowest to Highest", value: "asc" },
  ];

  const { user } = useSelector((state: RootState) => state.UsersReducer);
  const navigate = useNavigate();

  return (
    <MenuDisplayOptionWrapper className="py-3">
      <div className="container d-flex flex-wrap">
        <div className="col d-flex flex-wrap align-items-center gap-2">
          <div className="col-12 col-lg-3">
            <p className="mb-1">Sort By:</p>
            <select className="form-select" onChange={handleSortChange}>
              {sortOption.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="col-12 col-lg-4">
            <p className="mb-1">Order:</p>
            <select className="form-select" onChange={handleOrderChange}>
              {orderOption.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-12 col-lg-3 mx-auto mt-2 mt-lg-0">
          <p className="mb-1">Filter by category:</p>
          <select className="form-select" onChange={handleFilterChange}>
            {categories.length > 0 ? (
              <>
                <option value={0}>All</option>
                {categories.map((category) => (
                  <option key={category.Id} value={category.Id}>
                    {category.Name}
                  </option>
                ))}
              </>
            ) : (
              <option value={0}>All</option>
            )}
          </select>
        </div>
        {user.Role == 0 && (
          <div className="col-12 col-lg-2 mx-auto mt-5 mt-lg-4 d-flex justify-content-center align-items-center">
            <Button
              btnStyle={{
                backgroundColor: "#579EFF",
                color: "#FFFFFF",
                padding: "0.25rem 1rem",
              }}
              btnFunction={() => navigate("/admin/new-menu")}
            >
              Add Menu
            </Button>
          </div>
        )}
      </div>
    </MenuDisplayOptionWrapper>
  );
};

export default MenuDisplayOption;
