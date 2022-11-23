import { CustomForm } from "components/shared-style";
import { SearchInput } from "interfaces/FormInput";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import SearchBarWrapper from "./style";

const SearchBar = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SearchInput>();

  const onSubmit: SubmitHandler<SearchInput> = async (data) => {
    // try {
    //   const res = await fetch(`http://localhost:8080/login`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   }).then((res) => {
    //     if (!res.ok) {
    //         if (res.status === 403) {
    //           setError("Wrong password");
    //         } else if (res.status === 404) {
    //           setError("User not found");
    //         } else {
    //           setError("An error has occured, pleas try again later");
    //         }
    //         throw new Error();
    //     }
    //     return res.json();
    //   });
    // } catch (error) {
    // } finally {
    //   reset();
    // }

    console.log(data);
  };

  return (
    <SearchBarWrapper>
      <CustomForm className="p-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="col-12 col-lg-4 mx-auto">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="searchInput"
              placeholder="Search"
              {...register("search")}
            />
          </div>
        </div>
      </CustomForm>
    </SearchBarWrapper>
  );
};

export default SearchBar;
