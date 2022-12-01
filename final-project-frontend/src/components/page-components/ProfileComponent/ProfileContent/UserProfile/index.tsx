import UserIcon from "assets/UserIcon";
import Button from "components/shared-components/Button";
import { ErrorMessage } from "components/shared-style";
import { ProfileUpdateInput, RegisterInput } from "interfaces/FormInput";
import { IUser } from "interfaces/User";
import React, { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import UserProfileWrapper, { UpdateProfileForm } from "./style";

interface UserProfileProp {
  user: IUser;
}

const UserProfile = ({ user }: UserProfileProp) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ProfileUpdateInput>();

  const [input, setInput] = useState<ProfileUpdateInput>({
    profilePicture: "",
    fullName: user.FullName,
    email: user.Email,
    phone: user.Phone,
    username: user.Username,
  });
  const [enableInput, setEnableInput] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };

  const handleClickUpdate = () => {
    if (enableInput) {
      console.log(input);
    } else {
      setEnableInput(true);
    }
  };

  return (
    <UserProfileWrapper className="pt-3">
      <div className="col-12 col-lg-6">
        <UpdateProfileForm className="mt-4 mt-lg-5">
          <div className="col-12 mx-auto input-group mb-2 justify-content-between">
            <div className="col-12 col-lg-3 d-flex align-items-center justify-content-end">
              <p className="text-end">Profile Picture: </p>
            </div>
            <div className="col-12 col-lg-9 d-flex align-items-center">
              <input
                type="file"
                accept="image/*"
                className="form-control px-4"
                id="profilePictureInput"
                placeholder="Full name"
                {...register("profilePicture", { required: true })}
                onChange={handleChange}
                disabled={!enableInput}
              />
              {errors.fullName?.type === "required" && (
                <ErrorMessage>Full name is required</ErrorMessage>
              )}
            </div>
          </div>
          <div className="col-12 mx-auto input-group mb-2 justify-content-betweena">
            <div className="col-12 col-lg-3 d-flex align-items-center justify-content-end">
              <p className="text-end">Full Name: </p>
            </div>
            <div className="col-12 col-lg-9 d-flex align-items-center">
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
                <ErrorMessage>Full name is required</ErrorMessage>
              )}
            </div>
          </div>
          <div className="col-12 mx-auto input-group mb-2 justify-content-between">
            <div className="col-12 col-lg-3 d-flex align-items-center justify-content-end">
              <p className="text-end">Email: </p>
            </div>
            <div className="col-12 col-lg-9 d-flex align-items-center">
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
                <ErrorMessage>Email is required</ErrorMessage>
              )}
            </div>
          </div>
          <div className="col-12 mx-auto input-group mb-2 justify-content-between">
            <div className="col-12 col-lg-3 d-flex align-items-center justify-content-end">
              <p className="text-end">Phone Number: </p>
            </div>
            <div className="col-12 col-lg-9 d-flex align-items-center">
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
                <ErrorMessage>Phone number is required</ErrorMessage>
              )}
            </div>
          </div>
          <div className="col-12 mx-auto input-group mb-2 justify-content-between">
            <div className="col-12 col-lg-3 d-flex align-items-center justify-content-end">
              <p className="text-end">Username: </p>
            </div>
            <div className="col-12 col-lg-9 d-flex align-items-center">
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
                <ErrorMessage>Username is required</ErrorMessage>
              )}
            </div>
          </div>
          <div className="col-12 mx-auto input-group my-5 justify-content-start">
            <div className="col-12 col-lg-2 d-flex align-items-center">
              <Button
                btnStyle={{
                  width: "100%",
                  backgroundColor: "#579EFF",
                  color: "#FFFFFF",
                }}
                btnFunction={handleClickUpdate}
                type={!enableInput ? "submit" : "button"}
              >
                Update
              </Button>
            </div>
            {error && (
              <div className="col-12 col-lg-8 d-flex align-items-center ms-0 ms-lg-3 mt-2 mt-lg-0">
                <ErrorMessage>{error}</ErrorMessage>
              </div>
            )}
          </div>
        </UpdateProfileForm>
      </div>
      <div className="col-12 col-lg-6 d-flex justify-content-center">
        {user.ProfilePicture ? (
          <img src={user.ProfilePicture} alt="profile pict" />
        ) : (
          <UserIcon height="250" fill="#000000" />
        )}
      </div>
    </UserProfileWrapper>
  );
};

export default UserProfile;
