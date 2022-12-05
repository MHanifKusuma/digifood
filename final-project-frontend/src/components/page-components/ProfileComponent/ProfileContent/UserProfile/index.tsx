import UserIcon from "assets/UserIcon";
import axios from "axios";
import Button from "components/shared-components/Button";
import { ErrorMessage } from "components/shared-style";
import { ProfileUpdateInput, RegisterInput } from "interfaces/FormInput";
import { IUser } from "interfaces/User";
import React, { FormEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { fetchUser, SetUser } from "redux/actions/UserAction";
import { UserDispatch } from "redux/actions/UserAction/type";
import UserProfileWrapper, { UpdateProfileForm } from "./style";

interface UserProfileProp {
  user: IUser;
}

const UserProfile = ({ user }: UserProfileProp) => {
  const [cookies] = useCookies(["login"]);
  const userDispatch: UserDispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProfileUpdateInput>({
    defaultValues: {
      profilePicture: user.ProfilePicture,
      fullName: user.FullName,
      email: user.Email,
      phone: user.Phone,
      username: user.Username,
    },
  });

  const [input, setInput] = useState<ProfileUpdateInput>({
    profilePicture: user.ProfilePicture,
    fullName: user.FullName,
    email: user.Email,
    phone: user.Phone,
    username: user.Username,
  });
  const [enableInput, setEnableInput] = useState(false);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState<File>();
  const [previewImage, setPreviewImage] = useState<string | undefined>();

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const onSubmit: SubmitHandler<ProfileUpdateInput> = async (data) => {
    let submitData: ProfileUpdateInput = {
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
            profilePicture: res.data.secure_url,
          };
        })
        .catch((error) => setError(`upload photo error: ${error.message}`));
    }

    await axios
      .put(`http://localhost:8080/profile`, submitData, {
        headers: {
          Authorization: `Bearer ${cookies.login}`,
        },
      })
      .then(() => {
        userDispatch(
          SetUser({
            ...user,
            ProfilePicture: submitData.profilePicture,
          })
        );
        window.location.reload();
      })
      .catch((error) => setError(error.message));
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
      setPreviewImage(user.ProfilePicture || undefined);

      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewImage(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  useEffect(() => {
    reset({
      profilePicture: user.ProfilePicture,
      fullName: user.FullName,
      email: user.Email,
      phone: user.Phone,
      username: user.Username,
    });
    setInput({
      profilePicture: user.ProfilePicture,
      fullName: user.FullName,
      email: user.Email,
      phone: user.Phone,
      username: user.Username,
    });
  }, [user]);

  return (
    <UserProfileWrapper className="pt-3">
      <div className="col-12 col-lg-6">
        <UpdateProfileForm
          className="mt-4 mt-lg-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="col-12 mx-auto input-group mb-2 justify-content-between">
            <div className="col-12 col-lg-3 d-flex align-items-center justify-content-lg-end">
              <p className="text-lg-end">Profile Picture: </p>
            </div>
            <div className="col-12 col-lg-9 d-flex flex-wrap flex-lg-nowrap align-items-center">
              <input
                type="file"
                accept="image/*"
                className="form-control px-4"
                id="profilePictureInput"
                placeholder="Full name"
                onChange={handleChangeImage}
                disabled={!enableInput}
              />
            </div>
          </div>
          <div className="col-12 mx-auto input-group mb-2 justify-content-betweena">
            <div className="col-12 col-lg-3 d-flex align-items-center justify-content-lg-end">
              <p className="text-lg-end">Full Name: </p>
            </div>
            <div className="col-12 col-lg-9 d-flex flex-wrap flex-lg-nowrap align-items-center">
              <input
                type="text"
                className="form-control"
                id="nameInput"
                placeholder="Full name"
                {...register("fullName", { required: true })}
                value={input.fullName}
                onChange={handleChange}
                disabled={!enableInput}
              />
              {errors.fullName?.type === "required" && (
                <div className="col-12 col-lg-3">
                  <ErrorMessage>Full name is required</ErrorMessage>
                </div>
              )}
            </div>
          </div>
          <div className="col-12 mx-auto input-group mb-2 justify-content-between">
            <div className="col-12 col-lg-3 d-flex align-items-center justify-content-lg-end">
              <p className="text-lg-end">Email: </p>
            </div>
            <div className="col-12 col-lg-9 d-flex flex-wrap flex-lg-nowrap align-items-center">
              <input
                type="email"
                className="form-control"
                id="emailInput"
                placeholder="Email"
                {...register("email", { required: true })}
                value={input.email}
                onChange={handleChange}
                disabled={!enableInput}
              />
              {errors.email?.type === "required" && (
                <div className="col-12 col-lg-3">
                  <ErrorMessage>Email is required</ErrorMessage>
                </div>
              )}
            </div>
          </div>
          <div className="col-12 mx-auto input-group mb-2 justify-content-between">
            <div className="col-12 col-lg-3 d-flex align-items-center justify-content-lg-end">
              <p className="text-lg-end">Phone Number: </p>
            </div>
            <div className="col-12 col-lg-9 d-flex flex-wrap flex-lg-nowrap align-items-center">
              <input
                type="text"
                className="form-control"
                id="phoneInput"
                placeholder="Phone"
                {...register("phone", { required: true })}
                value={input.phone}
                onChange={handleChange}
                disabled={!enableInput}
              />
              {errors.phone?.type === "required" && (
                <div className="col-12 col-lg-3">
                  <ErrorMessage>Phone number is required</ErrorMessage>
                </div>
              )}
            </div>
          </div>
          <div className="col-12 mx-auto input-group mb-2 justify-content-between">
            <div className="col-12 col-lg-3 d-flex align-items-center justify-content-lg-end">
              <p className="text-lg-end">Username: </p>
            </div>
            <div className="col-12 col-lg-9 d-flex flex-wrap flex-lg-nowrap align-items-center">
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder="Username"
                {...register("username", { required: true })}
                value={input.username}
                onChange={handleChange}
                disabled={!enableInput}
              />
              {errors.username?.type === "required" && (
                <div className="col-12 col-lg-3">
                  <ErrorMessage>Username is required</ErrorMessage>
                </div>
              )}
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
        </UpdateProfileForm>
      </div>
      <div className="col-12 col-lg-6 d-flex justify-content-center">
        {previewImage ? (
          <img src={previewImage} alt="profile pict" />
        ) : (
          <UserIcon height="250" fill="#000000" />
        )}
      </div>
    </UserProfileWrapper>
  );
};

export default UserProfile;
