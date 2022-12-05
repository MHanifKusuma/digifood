import TrashIcon from "assets/TrashIcon";
import axios from "axios";
import AddMenuOptionsModal from "components/shared-components/AddMenuOptionsModal";
import Button from "components/shared-components/Button";
import { ErrorMessage } from "components/shared-style";
import { ICategory } from "interfaces/Category";
import {
  MenuCreateUpdateInput,
  ProfileUpdateInput,
} from "interfaces/FormInput";
import { IMenu, IMenuOptions } from "interfaces/Menu";
import React, { FormEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "utils/index";
import AdminMenuInfoWrapper, {
  AdminMenuInfoForm,
  MenuOptionsWrapper,
} from "./style";

export enum MenuInfoComponentType {
  UPDATE = "update",
  CREATE = "create",
}

interface AdminMenuInfoProp {
  menu: IMenu;
  categories: ICategory[];
  type: MenuInfoComponentType;
}

const AdminMenuInfo = ({ menu, type, categories }: AdminMenuInfoProp) => {
  const [cookies] = useCookies(["login"]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<MenuCreateUpdateInput>({
    defaultValues: {
      id: menu.Id,
      name: menu.Name,
      description: menu.Description,
      price: menu.Price,
      menu_photo: menu.MenuPhoto,
      menu_options: menu.MenuOptions,
      deleted_menu_options: [],
    },
  });

  const [menuOptionsArray, setMenuOptionsArray] = useState<IMenuOptions[]>(
    menu.MenuOptions
  );
  const [input, setInput] = useState<MenuCreateUpdateInput>({
    id: menu.Id,
    name: menu.Name,
    category_id: menu.CategoryId,
    description: menu.Description,
    price: menu.Price,
    menu_photo: menu.MenuPhoto,
    menu_options: menu.MenuOptions,
    deleted_menu_options: [],
  });

  const [enableInput, setEnableInput] = useState(
    type === MenuInfoComponentType.UPDATE ? false : true
  );
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string | undefined>();

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
    if (menuOptionsArray[index].Id != 0) {
      input.deleted_menu_options.push(menuOptionsArray[index].Id);
      setValue("deleted_menu_options", input.deleted_menu_options);
    }

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

  const handleChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreviewImage(menu.MenuPhoto || undefined);

      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewImage(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleClickDelete = () => {
    axios
      .delete(`http://localhost:8080/admin/menus/${menu.Id}`, {
        headers: {
          Authorization: `Bearer ${cookies.login}`,
        },
      })
      .then((data) => navigate("/menus"))
      .catch((error) => setError(error.message));
  };

  const onSubmit: SubmitHandler<MenuCreateUpdateInput> = async (data) => {
    data.menu_options = menuOptionsArray;
    let submitData: MenuCreateUpdateInput = {
      ...data,
    };

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("upload_preset", "digifood-project");
      const uploadPost = await axios
        .post(
          "https://api.cloudinary.com/v1_1/dhlgjnupw/image/upload",
          formData
        )
        .then((res) => {
          submitData = {
            ...data,
            menu_photo: res.data.secure_url,
          };
        })
        .catch((error) => setError(`upload photo error: ${error.message}`));
    }

    switch (type) {
      case MenuInfoComponentType.UPDATE:
        axios
          .put(`http://localhost:8080/admin/menus/:${data.id}`, submitData, {
            headers: {
              Authorization: `Bearer ${cookies.login}`,
            },
          })
          .then((data) => window.location.reload())
          .catch((error) => setError(error.message));

        return;

      case MenuInfoComponentType.CREATE:
        axios
          .post(`http://localhost:8080/admin/menus`, data, {
            headers: {
              Authorization: `Bearer ${cookies.login}`,
            },
          })
          .then((data) =>
            navigate(`/menus/${data.data.data.Id}/${data.data.data.Name}`)
          )
          .catch((error) => setError(error.message));

        return;

      default:
        return;
    }
  };

  useEffect(() => {
    reset({
      id: menu.Id,
      category_id: menu.CategoryId,
      name: menu.Name,
      description: menu.Description,
      price: menu.Price,
      menu_photo: menu.MenuPhoto,
      menu_options: menu.MenuOptions,
      deleted_menu_options: [],
    });
    setInput({
      id: menu.Id,
      category_id: menu.CategoryId,
      name: menu.Name,
      description: menu.Description,
      price: menu.Price,
      menu_photo: menu.MenuPhoto,
      menu_options: menu.MenuOptions,
      deleted_menu_options: [],
    });
    setMenuOptionsArray(menu.MenuOptions);
  }, [menu]);

  const [showAddMenuOptionModal, setShowAddMenuOptionModal] = useState(false);

  return (
    <AdminMenuInfoWrapper className="pt-3">
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
              onChange={handleChangeImage}
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
        <div className="col-12 mx-auto input-group mb-2 justify-content-betweena">
          <div className="col-12 col-lg-3 d-flex align-items-center justify-content-lg-end">
            <p className="text-lg-end">Menu Category: </p>
          </div>
          <div className="col-12 col-lg-9 d-flex flex-wrap flex-lg-nowrap align-items-center">
            <select
              className="form-select"
              id="categorySelect"
              {...register("category_id", {
                required: true,
                valueAsNumber: true,
              })}
              disabled={!enableInput}
            >
              {categories.map((category) => (
                <option key={category.Id} value={category.Id}>
                  {category.Name}
                </option>
              ))}
            </select>
            {errors.name?.type === "required" && (
              <div className="col-12 col-lg-3">
                <ErrorMessage>Menu Category is required</ErrorMessage>
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
              {...register("price", { required: true, valueAsNumber: true })}
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

        {type === MenuInfoComponentType.UPDATE && (
          <div className="col-12 mx-auto input-group my-5 justify-content-start">
            <div className="col-12 col-lg-2 d-flex align-items-center">
              {!enableInput && (
                <>
                  <Button
                    btnStyle={{
                      width: "100%",
                      backgroundColor: "#579EFF",
                      color: "#FFFFFF",
                    }}
                    btnFunction={handleClickUpdate}
                    type={"button"}
                    btnClass={`mx-2`}
                  >
                    Update
                  </Button>
                  <Button
                    btnStyle={{
                      width: "100%",
                      backgroundColor: "#E98E7D",
                      color: "#FFFFFF",
                    }}
                    btnFunction={handleClickDelete}
                    type={"button"}
                    btnClass={`mx-2`}
                  >
                    Delete
                  </Button>
                </>
              )}

              {enableInput && (
                <Button
                  btnStyle={{
                    width: "100%",
                    backgroundColor: "#579EFF",
                    color: "#FFFFFF",
                  }}
                  type={"submit"}
                  btnClass={`mx-2`}
                >
                  Submit
                </Button>
              )}
            </div>
            {error && (
              <div className="col-12 col-lg-8 d-flex align-items-center ms-0 ms-lg-3 mt-2 mt-lg-0">
                <div className="col-12">
                  <ErrorMessage>{error}</ErrorMessage>
                </div>
              </div>
            )}
          </div>
        )}

        {type === MenuInfoComponentType.CREATE && (
          <div className="col-12 mx-auto input-group my-5 justify-content-start">
            <div className="col-12 col-lg-3 d-flex align-items-center">
              <Button
                btnStyle={{
                  width: "100%",
                  backgroundColor: "#579EFF",
                  color: "#FFFFFF",
                }}
                type={"submit"}
              >
                Add Menu
              </Button>
            </div>
            {error && (
              <div className="col-12 col-lg-9 d-flex align-items-center ms-0 ms-lg-3 mt-2 mt-lg-0">
                <div className="col-12">
                  <ErrorMessage>{error}</ErrorMessage>
                </div>
              </div>
            )}
          </div>
        )}
      </AdminMenuInfoForm>

      <AddMenuOptionsModal
        show={showAddMenuOptionModal}
        handleClose={() => setShowAddMenuOptionModal(false)}
        addMenuOption={handleAddMenuOptions}
        menuId={menu.Id}
      />
    </AdminMenuInfoWrapper>
  );
};

export default AdminMenuInfo;
