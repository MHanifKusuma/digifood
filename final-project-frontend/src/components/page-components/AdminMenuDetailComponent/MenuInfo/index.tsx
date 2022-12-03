import TrashIcon from "assets/TrashIcon";
import axios from "axios";
import AddMenuOptionsModal from "components/shared-components/AddMenuOptionsModal";
import Button from "components/shared-components/Button";
import { ErrorMessage } from "components/shared-style";
import {
  MenuCreateUpdateInput,
  ProfileUpdateInput,
} from "interfaces/FormInput";
import { IMenu, IMenuOptions } from "interfaces/Menu";
import React, { FormEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { formatCurrency } from "utils/index";
import AdminMenuInfoWrapper, {
  AdminMenuInfoForm,
  MenuOptionsWrapper,
} from "./style";

interface AdminMenuInfoProp {
  menu: IMenu;
}

const AdminMenuInfo = ({ menu }: AdminMenuInfoProp) => {
  const [cookies] = useCookies(["login"]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MenuCreateUpdateInput>({
    defaultValues: {
      id: menu.Id,
      name: menu.Name,
      description: menu.Description,
      price: menu.Price,
      menuPhoto: menu.MenuPhoto,
      MenuOptions: menu.MenuOptions,
    },
  });

  const [menuOptionsArray, setMenuOptionsArray] = useState<IMenuOptions[]>(
    menu.MenuOptions
  );
  const [input, setInput] = useState<MenuCreateUpdateInput>({
    id: menu.Id,
    name: menu.Name,
    description: menu.Description,
    price: menu.Price,
    menuPhoto: menu.MenuPhoto,
    MenuOptions: menu.MenuOptions,
  });

  const [enableInput, setEnableInput] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  const handleDescriptionChange = (e: FormEvent<HTMLTextAreaElement>) => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleAddMenuOptions = (option: IMenuOptions) => {
    menuOptionsArray.push(option);
    setMenuOptionsArray(menuOptionsArray);
  };

  const handleDeleteMenuOptions = (index: number) => {
    const newMenuOptionsArray = menuOptionsArray.filter(
      (option, optionIndex) => optionIndex !== index
    );
    setMenuOptionsArray(newMenuOptionsArray);
  };

  const handleClickUpdate = () => {
    if (!enableInput) {
      setEnableInput(true);
    }
  };

  const onSubmit: SubmitHandler<MenuCreateUpdateInput> = async (data) => {
    data.MenuOptions = menuOptionsArray;
    console.log(data);
    // await axios
    //   .put(`http://localhost:8080/admin/menus/:${data.id}`, data, {
    //     headers: {
    //       Authorization: `Bearer ${cookies.login}`,
    //     },
    //   })
    //   .then(() => window.location.reload())
    //   .catch((error) => setError(error.message));
  };

  useEffect(() => {
    reset({
      id: menu.Id,
      name: menu.Name,
      description: menu.Description,
      price: menu.Price,
      menuPhoto: menu.MenuPhoto,
      MenuOptions: menu.MenuOptions,
    });
    setInput({
      id: menu.Id,
      name: menu.Name,
      description: menu.Description,
      price: menu.Price,
      menuPhoto: menu.MenuPhoto,
      MenuOptions: menu.MenuOptions,
    });
    setMenuOptionsArray(menu.MenuOptions);
  }, [menu]);

  const [showAddMenuOptionModal, setShowAddMenuOptionModal] = useState(false);

  return (
    <AdminMenuInfoWrapper className="pt-3">
      <div className="col-12 col-lg-6">
        <AdminMenuInfoForm
          className="mt-4 mt-lg-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="col-12 mx-auto input-group mb-2 justify-content-between">
            <div className="col-12 col-lg-3 d-flex align-items-center justify-content-lg-end">
              <p className="text-lg-end">Menu Photo: </p>
            </div>
            <div className="col-12 col-lg-9 d-flex flex-wrap flex-lg-nowrap align-items-center">
              <input
                type="file"
                accept="image/*"
                className="form-control px-4"
                id="menuPhotoInput"
                placeholder="Menu Photo"
                {...register("menuPhoto")}
                onChange={handleChange}
                disabled={!enableInput}
              />
            </div>
          </div>
          <div className="col-12 mx-auto input-group mb-2 justify-content-betweena">
            <div className="col-12 col-lg-3 d-flex align-items-center justify-content-lg-end">
              <p className="text-lg-end">Menu Name: </p>
            </div>
            <div className="col-12 col-lg-9 d-flex flex-wrap flex-lg-nowrap align-items-center">
              <input
                type="text"
                className="form-control"
                id="menuNameinput"
                placeholder="Menu Name"
                {...register("name", { required: true })}
                value={input.name}
                onChange={handleChange}
                disabled={!enableInput}
              />
              {errors.name?.type === "required" && (
                <div className="col-12 col-lg-3">
                  <ErrorMessage>Menu name is required</ErrorMessage>
                </div>
              )}
            </div>
          </div>
          <div className="col-12 mx-auto input-group mb-2 justify-content-between">
            <div className="col-12 col-lg-3 d-flex align-items-center justify-content-lg-end">
              <p className="text-lg-end">Menu Description: </p>
            </div>
            <div className="col-12 col-lg-9 d-flex flex-wrap flex-lg-nowrap align-items-center">
              <textarea
                className="form-control"
                id="menuDescription"
                placeholder="Menu description"
                cols={30}
                rows={5}
                {...register("description", { required: true })}
                value={input.description}
                onChange={handleDescriptionChange}
                disabled={!enableInput}
              ></textarea>
              {errors.description?.type === "required" && (
                <div className="col-12 col-lg-3">
                  <ErrorMessage>Menu description is required</ErrorMessage>
                </div>
              )}
            </div>
          </div>
          <div className="col-12 mx-auto input-group mb-2 justify-content-between">
            <div className="col-12 col-lg-3 d-flex align-items-center justify-content-lg-end">
              <p className="text-lg-end">Menu Price: </p>
            </div>
            <div className="col-12 col-lg-9 d-flex flex-wrap flex-lg-nowrap align-items-center">
              <input
                type="number"
                className="form-control"
                id="menuPriceInput"
                placeholder="Menu price"
                {...register("price", { required: true })}
                value={input.price}
                onChange={handleChange}
                disabled={!enableInput}
              />
              {errors.price?.type === "required" && (
                <div className="col-12 col-lg-3">
                  <ErrorMessage>Menu price is required</ErrorMessage>
                </div>
              )}
            </div>
          </div>
          <div className="col-12 mx-auto input-group mb-2 justify-content-between">
            <div className="col-12 col-lg-3 d-flex align-items-center justify-content-lg-end">
              <p className="text-lg-end">Menu Options: </p>
            </div>
            <Button
              btnStyle={{
                width: "100%",
                backgroundColor: "#579EFF",
                color: "#FFFFFF",
              }}
              btnFunction={() => setShowAddMenuOptionModal(true)}
              type={"button"}
              disabled={!enableInput}
            >
              Add Options
            </Button>
          </div>
          <div className="col-12 mx-auto mb-2 justify-content-start">
            <div className="row gap-3 p-3">
              {menuOptionsArray.map((option, index) => (
                <MenuOptionsWrapper className="col-12 col-lg-5" key={index}>
                  <p>{option.Name}</p>
                  <div className="d-flex align-items-center justify-content-between pe-3">
                    <p>+ Rp {formatCurrency(option.Price)}</p>
                    {enableInput && (
                      <div onClick={() => handleDeleteMenuOptions(index)}>
                        <TrashIcon height="20" fill="#E98E7D" />
                      </div>
                    )}
                  </div>
                </MenuOptionsWrapper>
              ))}
            </div>
          </div>

          <div className="col-12 mx-auto input-group my-5 justify-content-start">
            <div className="col-12 col-lg-2 d-flex align-items-center">
              {!enableInput && (
                <Button
                  btnStyle={{
                    width: "100%",
                    backgroundColor: "#579EFF",
                    color: "#FFFFFF",
                  }}
                  btnFunction={handleClickUpdate}
                  type={"button"}
                >
                  Update
                </Button>
              )}

              {enableInput && (
                <Button
                  btnStyle={{
                    width: "100%",
                    backgroundColor: "#579EFF",
                    color: "#FFFFFF",
                  }}
                  type={"submit"}
                >
                  Submit
                </Button>
              )}
            </div>
            {error && (
              <div className="col-12 col-lg-8 d-flex align-items-center ms-0 ms-lg-3 mt-2 mt-lg-0">
                <div className="col-12 col-lg-3">
                  <ErrorMessage>{error}</ErrorMessage>
                </div>
              </div>
            )}
          </div>
        </AdminMenuInfoForm>
      </div>
      <AddMenuOptionsModal
        show={showAddMenuOptionModal}
        handleClose={() => setShowAddMenuOptionModal(false)}
        addMenuOption={handleAddMenuOptions}
      />
    </AdminMenuInfoWrapper>
  );
};

export default AdminMenuInfo;
