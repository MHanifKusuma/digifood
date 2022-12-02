import axios from "axios";
import { CustomForm } from "components/shared-style";
import { SearchInput } from "interfaces/FormInput";
import { IMenu, IMenuPagination } from "interfaces/Menu";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import SearchBarWrapper from "./style";

interface MenuSearchProp {
  onSubmit: SubmitHandler<SearchInput>;
}

const SearchBar = ({ onSubmit }: MenuSearchProp) => {
  const { register, handleSubmit } = useForm<SearchInput>();

  return (
    <SearchBarWrapper>
      <CustomForm className="p-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-12 col-lg-8 col-xl-4 mx-auto">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="searchInput"
              placeholder="Search"
              {...register("name")}
            />
          </div>
        </div>
      </CustomForm>
    </SearchBarWrapper>
  );
};

export default SearchBar;
